'use strict'

const { ConsoleOutputter } = require('../lib/console-outputter')

describe('consoleOutputter', () => {
  it('has required functions', async function() {
    const outputter = new ConsoleOutputter()
    expect(outputter.header).toBeInstanceOf(Function)
    expect(outputter.inner).toBeInstanceOf(Function)
    expect(outputter.footer).toBeInstanceOf(Function)
  })
})
