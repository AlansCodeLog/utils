import { allFileTypes, tsEslintConfig, typescriptConfig } from "@alanscodelog/eslint-config"
export default tsEslintConfig(
	// https://github.com/AlansCodeLog/eslint-config
	...typescriptConfig,
	{
		files: [`**/*.{${allFileTypes.join(",")}}`],
		rules: {
			"jsdoc/check-tag-names": ["warn", {
				definedTags: ["env","testutil"],
			}],
		},
	},
)
