/**
 * Triggers a file download with the given name and contents.
 *
 * This is done by temporarily appending a link element to the document body, clicking it, then quickly removing it.
 *
 * Note: The download might be blocked or might prompt the user to allow multiple downloads after the first one if there is no user interaction with the page between each call.
 *
 * This means it can fail silently. Also we have no way of knowing if it worked or when/if the file downloaded.
 *
 * @env browser
 */
export function browserSaveFile(name: string, contents: string, { type = "text/plain", lastModified }: FilePropertyBag = {}): void {
	if (window === undefined) throw "This function can only be used in the browser."
	const url = window.URL.createObjectURL(new File([contents], name, { type, lastModified }))
	const link = document.createElement("a")
	link.href = url
	link.setAttribute("download", name)
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}
