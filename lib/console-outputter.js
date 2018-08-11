'use strict'

const ansiEscapes = require('ansi-escapes')
const chalk = require('chalk')
const cliCursor = require('cli-cursor')

const OFFSET = 15

class ConsoleOutputter {
  constructor() {
    this._lineHeader = ''
  }

  set lineHeader(delay) {
    this._lineHeader = delay.toString().padStart(3)
  }

  get lineHeader() {
    return this._lineHeader
  }

  writeProgress(position, length) {
    process.stdout.write(
      ansiEscapes.cursorLeft +
      ansiEscapes.eraseEndLine +
      `progress: ${position} / ${length}`)
  }

  header() {
    cliCursor.hide()
  }

  inner(word, index) {
    process.stdout.write(
      ansiEscapes.cursorLeft +
      ansiEscapes.eraseEndLine +
      this.lineHeader +
      ansiEscapes.cursorMove(OFFSET - index) +
      _termColor(word, index))
  }

  footer() {
    process.stdout.write(ansiEscapes.cursorLeft +
      ansiEscapes.eraseEndLine +
      '\n')
    cliCursor.show()
  }
}

function _termColor(word, index) {
  const left = word.substr(0, index)
  const pivot = chalk.red(word[index])
  const right = word.substr(index + 1)
  return `${left}${pivot}${right}`
}

module.exports = { ConsoleOutputter }
