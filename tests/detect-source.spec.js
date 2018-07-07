'use strict'

const path = require('path')
const execa = require('execa')
const sampleUrl = 'https://raw.githubusercontent.com/gliluaume/genepi-console/master/tests/text.txt'
const samplePath = path.join(__dirname, './text.txt')

const {
  detectSource,
  SUPPORTED_SOURCES } = require('../lib/detect-source')

describe('detectSource from args', () => {
  it('can guess stdin source', () => {
    expect(detectSource([])).toEqual(SUPPORTED_SOURCES.stdin)
  })
  it('can guess string source', () => {
    expect(detectSource(['My text is beautiful'])).toEqual(SUPPORTED_SOURCES.string)
  })
  it('can guess http source', () => {
    expect(detectSource([sampleUrl])).toEqual(SUPPORTED_SOURCES.http)
  })
  it('can guess file source', () => {
    expect(detectSource([samplePath])).toEqual(SUPPORTED_SOURCES.file)
  })
})

describe('pipeSource (WARN this resembles a functionnal test)', () => {
  const fixturePath = path.join(__dirname, './fixture-detect-source.js')
  const expected = 'This is a text.'

  it('can guess that a filename is given', async function() {
    const { stdout } = await execa(fixturePath, [samplePath])
    return expect(stdout).toEqual(expected)
  })

  it('can guess that a string is given', async function() {
    const { stdout } = await execa(fixturePath, [expected])
    return expect(stdout).toEqual(expected)
  })

  it('can guess that a url is given', async function() {
    const { stdout } = await execa(fixturePath, [sampleUrl])
    return expect(stdout).toEqual(expected)
  })
})
