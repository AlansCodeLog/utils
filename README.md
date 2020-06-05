
![Docs](https://github.com/alanscodelog/my-utils/workflows/Docs/badge.svg)
![Build](https://github.com/alanscodelog/my-utils/workflows/Build/badge.svg)
[![Release](https://github.com/alanscodelog/my-utils/workflows/Release/badge.svg)](https://www.npmjs.com/package/@alanscodelog/utils)

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
- `testing` - functions that are only useful for testing purposes
- `retypes` - existing functions typed as something else (e.g. Object.keys cast to a type that's useful for iterating, etc)
- `types` - all the types used internally + any utility types

```ts
// everything can be imported directly from the package
import { keys, debounce, ... } from "@alanscodelog/utils"

// keys({...})
```
 You can also import an entire set, although this is not reccomended because it makes it so the imports can't be treeshaking. Still it's possible because it's ocassionally useful for prototyping.

```ts
import {utils, testing, retypes, types} from "@alanscodelog/utils"

// retypes.keys({...})
```

Usually though, for better clarity, I import directly from the folders in the `dist` folder. The path becomes kind of long though so I set an alias to it (`@utils`) in my babel/typescript configs.

```ts
import { keys } from "@alanscodelog/utils/dist/retypes"
// @alanscodelog/utils/dist aliased to @utils:
import { keys } from "@utils/retypes"
```
