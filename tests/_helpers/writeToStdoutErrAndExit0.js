process.stdout.write("stdout", () => {
	process.stderr.write("stderr", () => {
		process.stdout.write("stdout", () => {
			process.exit(0)
		})
	})
})
