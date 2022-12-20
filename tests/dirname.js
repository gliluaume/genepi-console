import { dirname } from 'path'
import { fileURLToPath } from 'url'

export const getDirname = (importMetaUrl) =>
  dirname(fileURLToPath(importMetaUrl))
