'use strict'

const path = require('path')
const execa = require('execa')

describe('detectSource', () => {
  const fixturePath = path.join(__dirname, './fixture-detect-source.js')
  const samplePath = path.join(__dirname, './text.txt')
  const expected = 'This is a text.'

  it('can guess that a filename is given', async function() {
    const { stdout } = await execa(fixturePath, [samplePath])
    return expect(stdout).toEqual(expected)
  })

  it('can guess that a string is given', async function() {
    const { stdout } = await execa(fixturePath, [expected])
    return expect(stdout).toEqual(expected)
  })
})
