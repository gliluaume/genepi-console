#!/usr/bin/env node
'use strict'

const meow = require('meow')
const { genepi } = require('genepi')
const { ConsoleOutputter } = require('./lib/console-outputter')
const { pipeSource } = require('./lib/pipe-source')

const cli = meow(`
  Usage
    $ genepi <string|textfile|stdin|url> [-d|--delay <delay>]
`, {
  flags: {
    delay: {
      type: 'integer',
      alias: 'd'
    }
  }
})

function genepize(text) {
  return genepi(text, new ConsoleOutputter(), cli.flags.delay)
}

pipeSource().then(genepize)
