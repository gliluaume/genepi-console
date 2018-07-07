'use strict'

const path = require('path')
const execa = require('execa')

describe('pipeSource (WARN this resembles a functionnal test)', () => {
  const sampleUrl = 'https://raw.githubusercontent.com/gliluaume/genepi-console/master/tests/text.txt'
  const samplePath = path.join(__dirname, './text.txt')
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
