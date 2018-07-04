'use strict'

const fs = require('fs')
const got = require('got')

const SUPPORTED_SOURCES = {
  file: 'FILE',
  stdin: 'STDIN',
  http: 'HTTP',
  string: 'STRING'
}

function pipeSource() {
  return new Promise((resolve, reject) => {
    const source = detectSource(process.argv.slice(2))
    const candidate = process.argv[2]
    if (source === SUPPORTED_SOURCES.stdin) {
      process.stdin.setEncoding('utf8')
      process.stdin.on('readable', () => {
        const chunk = process.stdin.read()
        if (chunk !== null) {
          resolve(chunk)
        }
      })
    } else if (source === SUPPORTED_SOURCES.file) {
      fs.readFile(candidate, (err, data) => {
        if (err) throw new Error(err)
        resolve(data.toString())
      })
    } else if (source === SUPPORTED_SOURCES.http) {
      got(candidate).then((data) => {
        resolve(data.body)
      })
    } else {
      resolve(candidate)
    }
  })
}

function detectSource (args) {
  if (args.length < 1) {
    return SUPPORTED_SOURCES.stdin
  }
  const candidate = args[0]
  if (isFile(candidate)) {
    return SUPPORTED_SOURCES.file
  } if (candidate.startsWith('http')) {
    return SUPPORTED_SOURCES.http
  }
  return SUPPORTED_SOURCES.string
}

function isFile (path) {
  try {
    fs.accessSync(path, fs.constants.F_OK)
    return true
  } catch (e) {
    return false
  }
}

module.exports = { pipeSource, detectSource }
