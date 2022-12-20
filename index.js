#!/usr/bin/env node
'use strict'

import meow from 'meow'
import readline from 'readline'
import { GenepiReaderEE } from 'genepi'
import { ConsoleOutputter } from './lib/console-outputter.js'
import { pipeSource } from './lib/pipe-source.js'

const cli = meow(
  `
  Usage
    $ genepi-cli <string|textfile|stdin|url> [-d|--delay <delay>]
`,
  {
    importMeta: import.meta,
    flags: {
      delay: {
        type: 'number',
        default: 300,
        alias: 'd',
      },
      position: {
        type: 'number',
        default: 0,
        alias: 'p',
      },
    },
  }
)

function mapKeys(genepiReader, text, outputter) {
  return {
    up: function up() {
      const delay = Math.max(10, genepiReader._delay - 10) // TODO use delay in new version
      outputter.lineHeader = delay
      genepiReader.changeDelay(delay)
    },
    down: function down() {
      const delay = Math.min(750, genepiReader._delay + 10) // TODO use delay in new version
      outputter.lineHeader = delay
      genepiReader.changeDelay(delay)
    },
    left: function left() {
      outputter.lineHeader = -1
      genepiReader.pause()
      genepiReader.read(genepiReader.delay, genepiReader.position, true)
    },
    right: function right() {
      outputter.lineHeader = 1
      genepiReader.pause()
      genepiReader.read(genepiReader.delay, genepiReader.position, false)
    },
    space: function pause() {
      if (genepiReader.status === 'paused') {
        genepiReader.read()
      } else if (genepiReader.status !== 'end') {
        genepiReader.pause()
        outputter.writeProgress(genepiReader.position, genepiReader.length)
      }
    },
  }
}

function configureKeys(genepiReader, text, outputter) {
  const keyMap = mapKeys(genepiReader, text, outputter)
  readline.emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)
  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.stdout.write('\n')
      process.exit(130)
    }

    keyMap[key.name] && keyMap[key.name]()
  })
}

function genepize(text) {
  const outputter = new ConsoleOutputter()
  outputter.lineHeader = cli.flags.delay

  const genepiReader = new GenepiReaderEE(text, outputter)
  genepiReader.on('statusChange', (data) => {
    if (data === 'end') {
      process.exit(0)
    }
  })

  configureKeys(genepiReader, text, outputter)
  return genepiReader.read(cli.flags.delay, cli.flags.position)
}

process.stdout.write('\n')

pipeSource().then(genepize)
