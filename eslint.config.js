import { allFileTypes,typescriptConfig } from "@alanscodelog/eslint-config"
import { defineConfig } from "eslint/config"
export default defineConfig([
	// https://github.com/AlansCodeLog/eslint-config
	{
		extends: [typescriptConfig],
	},
	{
		files: [`**/*.{${allFileTypes.join(",")}}`],
		rules: {
			"jsdoc/check-tag-names": ["warn", {
				definedTags: ["env","testutil"],
			}],
		},
	},
	// RULE LINKS
	// Eslint: https://eslint.org/docs/rules/
	// Typescript: https://typescript-eslint.io/rules/
	// Vue: https://eslint.vuejs.org/rules/
])
