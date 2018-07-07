#!/usr/bin/env node
'use strict'

const { pipeSource } = require('../lib/pipe-source')

pipeSource().then(console.log)
