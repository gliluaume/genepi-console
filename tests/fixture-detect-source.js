#!/usr/bin/env node
'use strict'

const { pipeSource } = require('../lib/detect-source')

pipeSource().then(console.log)
