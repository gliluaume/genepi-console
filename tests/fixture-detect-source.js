#!/usr/bin/env node
'use strict'

import { pipeSource } from '../lib/pipe-source.js'

pipeSource().then(console.log)
