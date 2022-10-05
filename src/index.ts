import fs from 'fs'
import path from 'path'

const ROOT_PATH = process.cwd()

const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/i

interface CachesConfig {
  pathName?: `.${string}`
  fileName?: string
}

const DEFAULT_CONFIG: Required<CachesConfig> = {
  pathName: '.cache',
  fileName: 'index',
}

const existPath = ({ pathName = DEFAULT_CONFIG.pathName }: CachesConfig = {}) => fs.existsSync(path.resolve(ROOT_PATH, pathName))

const existFile = ({ fileName = DEFAULT_CONFIG.fileName, pathName = DEFAULT_CONFIG.pathName }: CachesConfig = {}) =>
  existPath(pathName) && fs.existsSync(path.resolve(ROOT_PATH, pathName, fileName))

const parseCaches = ({ fileName = DEFAULT_CONFIG.fileName, pathName = DEFAULT_CONFIG.pathName }: CachesConfig = {}) => {
  const lines = fs.readFileSync(path.resolve(ROOT_PATH, pathName, fileName), 'utf-8')
    .replace(/\r\n?/mg, '\n')
    .split('\n')
  const caches = new Map<string, string>()
  for (const line of lines) {
    const match = LINE.exec(line)
    if (!match) continue
    caches.set(match[1], match[2])
  }

  return caches
}

const setCaches = (
  caches: Map<string, string>,
  {
    fileName = DEFAULT_CONFIG.fileName,
    pathName = DEFAULT_CONFIG.pathName,
  }: CachesConfig = {}) => {
  const lines: string[] = []
  caches.forEach((value, key) => lines.push(`${key}=${value}`))
  fs.writeFileSync(path.resolve(ROOT_PATH, pathName, fileName), lines.join('\n'))
}

export const getCaches = (config?: CachesConfig) => {
  if (!existFile(config)) return null
  return Object.fromEntries(parseCaches(config))
}

export const getCache = (key: string, config?: CachesConfig) => {
  if (!existFile(config)) return undefined
  return parseCaches(config).get(key)
}

export const setCache = (key: string, value: string, config?: CachesConfig) => {
  const pathName = config?.pathName ?? DEFAULT_CONFIG.pathName
  const fileName = config?.fileName ?? DEFAULT_CONFIG.fileName
  if (!existPath(config))
    fs.mkdirSync(path.resolve(ROOT_PATH, pathName))
  if (!existFile(config))
    fs.writeFileSync(path.resolve(ROOT_PATH, pathName, fileName), '')

  const caches = parseCaches(config)
  caches.set(key, value)
  setCaches(caches, config)
}

export const removeCache = (key: string, config?: CachesConfig) => {
  if (!existFile(config)) return
  const caches = parseCaches(config)
  caches.delete(key)
  setCaches(caches, config)
}

export const clearCaches = (config?: CachesConfig) => {
  if (!existFile(config)) return
  const pathName = config?.pathName ?? DEFAULT_CONFIG.pathName
  const fileName = config?.fileName ?? DEFAULT_CONFIG.fileName
  fs.unlinkSync(path.resolve(ROOT_PATH, pathName, fileName))

  if (!fs.readdirSync(path.resolve(ROOT_PATH, pathName)).length)
    fs.rmdirSync(path.resolve(ROOT_PATH, pathName))
}
