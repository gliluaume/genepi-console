'use strict'

const fs = require('fs')
const got = require('got')

const { detectSource, SUPPORTED_SOURCES } = require('../lib/detect-source')

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

module.exports = { pipeSource }
