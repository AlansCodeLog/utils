[![Docs](https://github.com/alanscodelog/utils/workflows/Docs/badge.svg)](https://github.com/alanscodelog/utils/actions/workflows/docs.yml)
[![Build](https://github.com/alanscodelog/utils/actions/workflows/build.yml/badge.svg)](https://github.com/alanscodelog/utils/actions/workflows/build.yml)
[![Release](https://github.com/alanscodelog/utils/actions/workflows/release.yml/badge.svg)](https://www.npmjs.com/package/@alanscodelog/utils)
[![NPM Version (with latest tag)](https://img.shields.io/npm/v/%40alanscodelog%2Futils/latest)](https://www.npmjs.com/package/@alanscodelog/utils/v/latest)
[![NPM Version (with beta tag)](https://img.shields.io/npm/v/%40alanscodelog%2Futils/beta)](https://www.npmjs.com/package/@alanscodelog/utils/v/beta)

A collection of my utility functions and types. Mostly intended for use within my own projects to avoid having to depend on third party libraries.

Contains:
- Base utility functions (is*) for checking simple types and making code more readable.
- String utilities (pretty, crop, indent, readable, etc.) which I use a lot to format nice errors.
- Useful functions for prototyping, quick scripts, etc (run, RingBuffer, browserSaveFile, generateCopyRightNotice).
- Common utilities like debounce, throttle, etc. + some slighly novel onces like multisplice, changeObjectKeys, etc.

I try to keep the utilities simple, fast, and easy to maintain. Where type checks are enough, no runtime checks are done. I only include utilities and options I find myself using 3+ times, not every variation under the sun just because it looks useful and I might need it. If I find myself not using or replacing a function it will be removed.

Rarely used edge cases will not be covered (e.g. `walk` only walks simple objects/arrays, and does not handle cyclic objects).

Most utilities use mutability but can be made to work immutably if needed.

# [Docs](https://alanscodelog.github.io/utils)

# Install

```bash
npm install @alanscodelog/utils
```

# Usage

The utility functions are all available as a subpath exports from the root of the package. Note that some are node only, and also some contain additional type exports (these can also be imported from the root or from `/types` as well).

```ts
// recommended import styles
import { keys } from "@alanscodelog/utils/keys"
import { debounce, Debounced } from "@alanscodelog/utils/debounce" 
import type { Debounced } from "@alanscodelog/utils/types"
import type { Debounced } from "@alanscodelog/utils"

// convenience import styles, not recommended, see why below
import { keys } from "@alanscodelog/utils"
import { run } from "@alanscodelog/utils/node"

// convenience import style for testing, this is usually fine
import { inspectError } from "@alanscodelog/utils/testing"
```

The following subpath exports are available for convenience:

- `/utils` - all non-node and non-testing utility functions
- `/node` - node only utility functions
- `/testing` - functions that are only useful for testing purposes
- `/types` - all the types used internally + any utility types

*Note that while convenient, they should be avoided in most situations.* Although the package is tree-shakeable (99.9\*), if using vite, for example, it's dev server does not tree-shake the imports from index files that re-export functions. This means importing from index files (i.e. the convenience subpath exports) slows things down.

Some utility functions are browser only, but they are included with the regular functions since they'll just throw when you try to use them (they should not cause errors when just getting imported).

\* There is one small namespace (Result) that it does not seem to be able to treeshake, but this is regardless of where you import it from, unless you use direct imports everywhere.

