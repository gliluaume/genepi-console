'use strict'

import fs from 'fs'

export const SUPPORTED_SOURCES = {
  file: 'FILE',
  stdin: 'STDIN',
  http: 'HTTP',
  string: 'STRING',
}

export function detectSource(args) {
  if (args.length < 1) {
    return SUPPORTED_SOURCES.stdin
  }
  const candidate = args[0]
  if (isFile(candidate)) {
    return SUPPORTED_SOURCES.file
  }
  if (candidate.startsWith('http')) {
    return SUPPORTED_SOURCES.http
  }
  return SUPPORTED_SOURCES.string
}

export function isFile(path) {
  try {
    fs.accessSync(path, fs.constants.F_OK)
    return true
  } catch (e) {
    return false
  }
}
