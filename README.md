![Docs](https://github.com/alanscodelog/utils/workflows/Docs/badge.svg)
![Build](https://github.com/alanscodelog/utils/workflows/Build/badge.svg)
[![Release](https://github.com/alanscodelog/utils/workflows/Release/badge.svg)](https://www.npmjs.com/package/@alanscodelog/utils)

A collection of my utility functions and types. Mostly intended for use within my own projects.

# [Docs](https://alanscodelog.github.io/utils)

# Install

```bash
npm install @alanscodelog/utils
# or
yarn add @alanscodelog/utils
```

# Usage

There's four types of utility functions available, with some having node only variants:
- `utils` - the main utility functions
	- `node_utils` - node only utility functions
- `testing` - functions that are only useful for testing purposes
- `retypes` - existing functions typed as something else (e.g. Object.keys cast to a type that's useful for iterating, etc)
- `types` - all the types used internally + any utility types
	- Also includes any enums.
And there's also:
- `colors` - contains the basic ansi escape codes, for small scripts, or debugging, where I don't need to add chalk.

Some utility functions are browser only, but they are included with the regular functions since they'll just throw when you try to use them (they should not cause errors when just getting imported). The node only ones will though so they must be separated.

```ts
// everything can be imported directly from the package (except individual colors and node_* only imports)
import { keys, debounce, colors, ...} from "@alanscodelog/utils"

// or you can import them like this to be clearer
import { MakeOptional, ...} from "@alanscodelog/utils/types"
// direct imports are also supported
import {debounce} from "@alanscodelog/utils/utils/debounce.js"

```

Vite seems to properly treeshake the 99.9%\* of the root imports, but it might be a problem with other bundlers, in which case import from one of the export paths.

\* There is one small namespace (Result) that it does not seem to be able to treeshake, but this is regardless of where you import it from, unless you use direct imports everywhere.
