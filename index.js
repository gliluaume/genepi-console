#!/usr/bin/env node
'use strict'

const meow = require('meow')
const readline = require('readline')
const { genepi, GenepiReader } = require('genepi')
const { ConsoleOutputter } = require('./lib/console-outputter')
const { pipeSource } = require('./lib/pipe-source')

const cli = meow(`
  Usage
    $ genepi-cli <string|textfile|stdin|url> [-d|--delay <delay>]
`, {
  flags: {
    delay: {
      type: 'integer',
      alias: 'd'
    }
  }
})

// TODO change genepi API:
//  * I do not want to set text and outputter on each call!!!
//  * expose paused status: I do not have to access internal promise
//  * play should have current delay if delay is not provided
// this function is a wrapper around API because it sucks
function buildkeyMap(genepiReader, text, outputter) {
  return {
    'up': function up() {
      const position = genepiReader.pause()
      const delay = Math.max(50, genepiReader._delay - 10) // TODO use delay in new version
      genepiReader.play(text, outputter, delay, position)
    },
    'down': function down() {
      const position = genepiReader.pause()
      const delay = Math.min(750, genepiReader._delay + 10) // TODO use delay in new version
      genepiReader.play(text, outputter, delay, position)
    },
    'space': function pause() {
      if (genepiReader._prom.isCancelled()) {
        genepiReader.resume(text, outputter)
      } else {
        genepiReader.pause()
      }
    }
  }
}

function configureKeys(readableStream, genepiReader, text, outputter) {
  const keyMap = buildkeyMap(genepiReader, text, outputter)
  readline.emitKeypressEvents(process.stdin)
  readableStream.setRawMode(true)
  readableStream.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.stdout.write('\n')
      process.exit(130)
    }

    keyMap[key.name] && keyMap[key.name]()
  })
}

function genepize(text) {
  const genepiReader = new GenepiReader()
  const outputter = new ConsoleOutputter()
  configureKeys(process.stdin, genepiReader, text, outputter)
  return genepiReader.play(text, outputter, 250)
}

pipeSource().then(genepize)
