![Docs](https://github.com/alanscodelog/my-utils/workflows/Docs/badge.svg)
![Build](https://github.com/alanscodelog/my-utils/workflows/Build/badge.svg)
[![Release](https://github.com/alanscodelog/my-utils/workflows/Release/badge.svg)](https://www.npmjs.com/package/@alanscodelog/utils)

A collection of my utility functions and types. Mostly intended for use within my own projects.

# [Docs](https://alanscodelog.github.io/my-utils)

# Install

```bash
npm install @alanscodelog/utils
# or
yarn add @alanscodelog/utils
```

# Usage

There's four types of utility functions available:
- `utils` - the main utility functions
	- Within these, some are node/browser only, they are tagged accordingly (`@env node`/`@env browser`).
- `testing` - functions that are only useful for testing purposes
- `retypes` - existing functions typed as something else (e.g. Object.keys cast to a type that's useful for iterating, etc)
- `types` - all the types used internally + any utility types
And there's also:
- `colors` - contains the basic ansi escape codes, for small scripts, or debugging, where I don't need to add chalk.

```ts
// everything can be imported directly from the package (except individual colors)
import { keys, debounce, ... } from "@alanscodelog/utils"
```
 You can also import an entire set, although this is not recommended because it makes it so the imports can't be treeshaken. Still it's possible because it's occasionally useful for prototyping.

```ts
import {utils, testing, retypes, types} from "@alanscodelog/utils"
```

Usually though, for better clarity, I import directly from the folders in the `dist` folder. The path becomes kind of long though so I set an alias to it (`@utils`) in my babel/typescript configs.

```ts
import { keys } from "@alanscodelog/utils/dist/retypes"
// @alanscodelog/utils/dist aliased to @utils:
import { keys } from "@utils/retypes"
```
