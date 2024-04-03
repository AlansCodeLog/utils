![Docs](https://github.com/alanscodelog/utils/workflows/Docs/badge.svg)
![Build](https://github.com/alanscodelog/utils/workflows/Build/badge.svg)
[![Release](https://github.com/alanscodelog/utils/workflows/Release/badge.svg)](https://www.npmjs.com/package/@alanscodelog/utils)

A collection of my utility functions and types. Mostly intended for use within my own projects.

# [Docs](https://alanscodelog.github.io/utils)

# Install

```bash
npm install @alanscodelog/utils
```

# Usage

The utility functions are available as a subpath exports from the root of the package. Note that some are node only, and also some contain additional type exports (these can also be imported from the root or `/types` as well).

```ts
// recommended import styles
import { keys } from "@alanscodelog/utils/keys"
import { debounce, Debounced } from "@alanscodelog/utils/debounce" 
import type { Debounced } from "@alanscodelog/utils/types"
import type { Debounced } from "@alanscodelog/utils"

// convenience import styles
import { keys } from "@alanscodelog/utils"
import { run } from "@alanscodelog/utils/node"
```

The following subpath exports are available for convenience:

- `/utils` - all non-node and non-testing utility functions
- `/node` - node only utility functions
- `/testing` - functions that are only useful for testing purposes
- `/types` - all the types used internally + any utility types

*Note that while convenient, they should be avoided in most situations.* Although the package is tree-shakeable (99.9\*), if using vite, for example, it's dev server does not tree-shake the imports from index files that re-export functions. This means importing from index files (i.e. the convenience subpath exports) slows things down.

Some utility functions are browser only, but they are included with the regular functions since they'll just throw when you try to use them (they should not cause errors when just getting imported).

\* There is one small namespace (Result) that it does not seem to be able to treeshake, but this is regardless of where you import it from, unless you use direct imports everywhere.

