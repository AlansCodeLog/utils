import pkg from "./package.json" with { type: "json" }


export default {
	githubPages: true,
	navigationLinks: {
		Github: pkg.repository,
		Issues: `${pkg.repository}/issues`,
		npm: `http://npmjs.com/${pkg.name}`,
	},
	readme: "README.md",
	logLevel: "Verbose",
	entryPoints: [
		"src/utils/index.ts",
		"src/types/index.ts"
	],
	out: "docs",
	excludePrivate: true,
	excludeExternals: true,
	validation: {
		invalidLink: true,
	},
	projectDocuments: [
		// "docs-src/DEVELOPMENT.md",
	]
}
