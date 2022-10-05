import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import { expect, it } from 'vitest'
import { clearCaches, getCache, getCaches, removeCache, setCache } from 'dist/index'

it('should create file when set caches', () => {
  if (fs.existsSync(path.resolve(process.cwd(), '.cache')))
    rimraf.sync(path.resolve(process.cwd(), '.cache'))

  expect(fs.existsSync(path.resolve(process.cwd(), '.cache', 'index'))).toBeFalsy()
  setCache('key', 'val')
  expect(fs.existsSync(path.resolve(process.cwd(), '.cache', 'index'))).toBeTruthy()
})

it('should get caches', () => {
  if (fs.existsSync(path.resolve(process.cwd(), '.cache')))
    rimraf.sync(path.resolve(process.cwd(), '.cache'))

  setCache('key1', 'val1')
  setCache('key2', 'val2')
  expect(getCache('key1')).toBe('val1')
  expect(getCache('key2')).toBe('val2')
  expect(getCaches()).toStrictEqual({ key1: 'val1', key2: 'val2' })
})

it('should cover cache', () => {
  if (fs.existsSync(path.resolve(process.cwd(), '.cache')))
    rimraf.sync(path.resolve(process.cwd(), '.cache'))

  setCache('key1', 'val1')
  expect(getCache('key1')).toBe('val1')
  setCache('key1', 'val2')
  expect(getCache('key1')).toBe('val2')
  expect(getCaches()).toStrictEqual({ key1: 'val2' })
})

it('should delete cache', () => {
  if (fs.existsSync(path.resolve(process.cwd(), '.cache')))
    rimraf.sync(path.resolve(process.cwd(), '.cache'))

  setCache('key1', 'val1')
  setCache('key2', 'val2')
  expect(getCaches()).toStrictEqual({ key1: 'val1', key2: 'val2' })
  removeCache('key1')
  expect(getCaches()).toStrictEqual({ key2: 'val2' })
  removeCache('key2')
  expect(getCaches()).toStrictEqual({})
})

it('should clear caches', () => {
  if (fs.existsSync(path.resolve(process.cwd(), '.cache')))
    rimraf.sync(path.resolve(process.cwd(), '.cache'))

  setCache('key1', 'val1')
  setCache('key2', 'val2')
  expect(getCaches()).toStrictEqual({ key1: 'val1', key2: 'val2' })
  clearCaches()
  expect(getCaches()).toBeNull()
  expect(fs.existsSync(path.resolve(process.cwd(), '.cache', 'index'))).toBeFalsy()
  expect(fs.existsSync(path.resolve(process.cwd(), '.cache'))).toBeFalsy()
})

it('should set path name', () => {
  const pathName = '.store'

  if (fs.existsSync(path.resolve(process.cwd(), pathName)))
    rimraf.sync(path.resolve(process.cwd(), pathName))
  expect(fs.existsSync(path.resolve(process.cwd(), pathName, 'index'))).toBeFalsy()
  setCache('key', 'val', { pathName })
  expect(fs.existsSync(path.resolve(process.cwd(), pathName, 'index'))).toBeTruthy()

  rimraf.sync(path.resolve(process.cwd(), pathName))
})

it('should set file name', () => {
  const fileName = 'store'

  if (fs.existsSync(path.resolve(process.cwd(), '.cache')))
    rimraf.sync(path.resolve(process.cwd(), '.cache'))

  expect(fs.existsSync(path.resolve(process.cwd(), '.cache', fileName))).toBeFalsy()
  setCache('key', 'val', { fileName })
  expect(fs.existsSync(path.resolve(process.cwd(), '.cache', fileName))).toBeTruthy()
})
