import { defineConfig } from "@alanscodelog/vite-config"
// https://vitejs.dev/config/
export default defineConfig({
	entryGlobs: [
		"src/**/*.ts",
		"!*.ts",
		"!*.js",
	],
	pluginOpts: {
		typesPlugin: {
			dtsGenerator: "tsc",
			project: "tsconfig.types.json",
		}
	}
}, {},)
