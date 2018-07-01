'use strict'

const ansiEscapes = require('ansi-escapes')
const chalk = require('chalk')

const OFFSET = 15

class ConsoleOutputter {
  header() {
  }
  inner(word, index) {
    process.stdout.write(ansiEscapes.cursorLeft +
      ansiEscapes.eraseEndLine +
      ansiEscapes.cursorMove(OFFSET - index) +
      _termColor(word, index))
  }
  footer() {
    process.stdout.write(ansiEscapes.cursorLeft +
      ansiEscapes.eraseEndLine)
    process.stdout.write('\n')
  }
}

function _termColor(word, index) {
  const left = word.substr(0, index)
  const pivot = chalk.red(word[index])
  const right = word.substr(index + 1)
  return `${left}${pivot}${right}`
}

module.exports = { ConsoleOutputter }
