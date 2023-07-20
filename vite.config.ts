import glob from "fast-glob"
import path from "path"
import url from "url"
import type { PluginOption } from "vite"
import dts from "vite-plugin-dts"
import { externalizeDeps } from "vite-plugin-externalize-deps"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

import { run } from "./src/node_utils/run.js"


const typesPlugin = ({ fixOnly }: { fixOnly: boolean }): PluginOption => ({
	name: "typesPlugin",
	// eslint-disable-next-line no-console
	writeBundle: async () => run(`npm run build:types${fixOnly ? ":fix" : ""}`).promise.catch(e => console.log(e)).then(() => undefined),
})


// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = url.fileURLToPath(new URL(".", import.meta.url))
// https://vitejs.dev/config/
export default async ({ mode }: { mode: string }) => defineConfig({
	plugins: [
		// it isn't enough to just pass the deps list to rollup.external since it will not exclude subpath exports
		externalizeDeps(),
		// even if we don't use aliases, this is needed to get imports based on baseUrl working
		tsconfigPaths(),
		// generates types for ts/vue files
		// if only using ts, can be removed and build:types script used instead
		dts({
			entryRoot: "src",
			tsconfigPath: "./tsconfig.types.json",
		}),
		// fixes alias and baseUrl imports in the generated types
		// cannot be removed because dts is not compatible with tsconfigPaths
		typesPlugin({ fixOnly: true }),
	],
	build: {
		outDir: "dist",
		lib: {
			entry: glob.sync(path.resolve(__dirname, "src/**/*.ts")),
			formats: ["es"],
		},
		rollupOptions: {
			output: {
				preserveModulesRoot: "src",
				preserveModules: true,
			},
		},
		minify: false, // this is a library
		...(mode === "production" ? {
		} : {
			sourcemap: "inline",
		}),
	},
	test: {
		cache: process.env.CI ? false : undefined,
	},
	resolve: {
		alias: [
			// for tests only, absolute path needed because of https://github.com/vitest-dev/vitest/issues/2425
			{ find: /^@\/(.*)/, replacement: `${path.resolve("src")}/$1/index.ts` },
			{ find: /^@tests\/(.*)/, replacement: `${path.resolve("tests")}/$1` },
		],
	},
	server: {
		watch: {
			// for pnpm
			followSymlinks: true,
			// watch changes in linked repos
			ignored: ["!**/node_modules/@alanscodelog/**"],
		},
	},
})
