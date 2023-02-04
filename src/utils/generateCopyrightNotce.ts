/**
 * What is says on the tin:
 *
 * ```
 * © Copyright {startYear}-{currentYear} {author} - {notice = All Rights Reserved.}
 * ```
 */
export const generateCopyrightNotice = (startYear: number | string, author: string, notice: string = "All Rights Reserved."): string =>
	`© Copyright ${startYear}-${new Date().getFullYear()} ${author} - ${notice}`
