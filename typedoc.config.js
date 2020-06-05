const pkg = require("./package.json")
const fs = require("fs")
const path = require("path")

module.exports = {
	readme: 'README.md',
	mode: "modules",
	inputFiles:["src"],
	out: "docs",
	excludeNotExported: true,
	excludePrivate: true,
	excludeExternals: true,
	ignoreCompilerErrors: true,
	theme: "./node_modules/typedoc-neo-theme/bin/default",
	exclude: [
		"tests/**/*",
		// not excluding index files causes problems
		"**/*index.ts",
	],
	plugin: [
		"typedoc-neo-theme",
		"typedoc-plugin-external-module-name",
	],
	"source": [
		{ "path": pkg.repository + "/tree/master/", "line": "L" }
	],
	//topbar
	"links": [
		{ "label": "Repository", "url": pkg.repository },
		{ "label": "Issues", "url": pkg.repository + "/issues" }
	],
	outline: [
		fs.readdirSync("src")
			.filter(dir => fs.statSync(path.join("src", dir)).isDirectory())
			.reduce((obj, curr) => { obj[ curr ] = curr; return obj }, {})
	]
};
