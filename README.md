<h1 align="center"><samp>local-caches</samp></h1>

<p align="center">
  <samp>Used for saving the caches of the CLI, which is convenient for the next execution.</samp>
</p>

## Usage

### Install

```
npm install local-caches
```

### Use

```ts
import { getCache, setCache } from 'local-caches'

setCache('baz', 'foo')
const val = getCache('baz') // 'foo'
```

> you can add ".cache/*" to your ".gitignore" file when you don't commit cache file.

## Configs

```ts
interface CachesConfig {
  // the dirname of saving caches
  // default '.cache'
  pathName?: `.${string}`
  // the filename of saving caches
  // default 'index'
  fileName?: string
}
```

## API

### getCaches

Used for getting all caches in a specified configuration.

```ts
declare const getCaches: (config?: CachesConfig | undefined) => Record<string, string> | null
```

### getCache

Used for getting a specified cache in a specified configuration.

```ts 
declare const getCache: (key: string, config?: CachesConfig | undefined) => string | undefined
```

### setCache

Used for setting cache in a specified configuration.

```ts 
declare const setCache: (key: string, value: string, config?: CachesConfig | undefined) => void
```

### removeCache

Used for removing a specified cache in a specified configuration.

```ts 
declare const setCache: (key: string, value: string, config?: CachesConfig | undefined) => void
```

### clearCaches

Use for clear all caches in a specified configuration.

```ts
declare const clearCaches: (config?: CachesConfig | undefined) => void
```


## License

[MIT](./LICENSE) License © 2022 [Dewey Ou](https://github.com/ouduidui)