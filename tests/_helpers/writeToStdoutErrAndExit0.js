const { stdout, stderr } = process

stdout.write("stdout")
stdout.end()
stdout.once("finish", () => {
	stderr.write("stderr")
	stderr.end()
	stderr.once("finish", () => {
		process.exit(0)
	})
})
