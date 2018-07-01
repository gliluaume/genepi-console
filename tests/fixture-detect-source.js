#!/usr/bin/env node
'use strict'

const { pipeSource } = require('../detect-source')

pipeSource().then(console.log)
