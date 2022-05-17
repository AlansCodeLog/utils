// const pkg = require("./package.json")
const fs = require("fs")
const path = require("path")


module.exports = {
	readme: "README.md",
	entryPoints: fs.readdirSync("src")
		.filter(dir => fs.statSync(path.join("src", dir)).isDirectory())
		.map(dir => `src/${dir}/index.ts`),
	out: "docs",
	// excludeNotExported: true,
	excludePrivate: true,
	excludeExternals: true,
	githubPages: true,
	// theme: "./node_modules/typedoc-neo-theme/bin/default",
	// source: [{
	// 	path: `${pkg.repository}/tree/master/`,
	// 	line: "L",
	// }],
	// prevents typedoc auto-detecting installed plugins
	// explicity listing them also makes things easier to debug
	// plugin: [
	// 	"typedoc-neo-theme",
	// ],
	// // temporarily turn off plugins (just setting plugin: [] will not work)
	// plugin:"none",
	// topbar
	// links: [
	// 	{ label: "Repository", url: pkg.repository },
	// 	{ label: "Issues", url: `${pkg.repository}/issues` },
	// ],
	validation: {
		invalidLink: true,
	},
}
