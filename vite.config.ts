import { babel } from "@rollup/plugin-babel"
import glob from "fast-glob"
import { builtinModules } from "module"
import path from "path"
import url from "url"
import type { PluginOption } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

import packageJson from "./package.json"
import { run } from "./src/node_utils/run.js"


const typesPlugin = (): PluginOption => ({
	name: "typesPlugin",
	// eslint-disable-next-line no-console
	writeBundle: async () => run("npm run build:types").promise.catch(e => console.log(e)).then(() => undefined),
})

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = url.fileURLToPath(new URL(".", import.meta.url))
// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => defineConfig({
	plugins: [
		babel({
			babelHelpers: "runtime",
			extensions: [".js", ".mjs", "ts"],
			presets: [
				["@babel/preset-env", {
					modules: false,
					useBuiltIns: "usage",
					debug: true,
					corejs: packageJson.dependencies["core-js"].slice(1, 4),
				}],
			],
			plugins: ["@babel/plugin-transform-runtime"],
		}),
		tsconfigPaths({ projects: ["./tsconfig.json"]}),
		typesPlugin(),
	],
	build: {
		outDir: "dist",
		cssCodeSplit: true,
		lib: {
			entry: glob.sync(path.resolve(__dirname, "src/**/*.ts")),
			formats: ["es"],
		},
		rollupOptions: {
			external: [...builtinModules, ...Object.keys((packageJson as any).dependencies ?? {}), ...Object.keys((packageJson as any).peerDependencies ?? {}), /@babel\/runtime/],
			output: {
				preserveModulesRoot: "src",
				preserveModules: true,
			},
		},
		...(mode === "production" ? {
			minify: false,
		} : {
			minify: false,
			sourcemap: "inline",
		}),
	},
	test: {
		cache: process.env.CI ? false : undefined,
	},
	// resolve: {
	// 	alias: [
	// 		// absolute path needed because of https://github.com/vitest-dev/vitest/issues/2425
	// 		// for tests only
	// 		{ find: /^@\/(.*)/, replacement: `${path.resolve("src")}/$1/index.ts` },
	// 		{ find: /^@tests\/(.*)/, replacement: `${path.resolve("tests")}/$1` },
	// 	],
	// },
})
