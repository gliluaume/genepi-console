'use strict'

const { ConsoleOutputter } = require('../lib/console-outputter')

// console shortcuts
const ESC = '\u001B['
const cursorLeft = ESC + 'G'
const eraseEndLine = ESC + 'K'

describe('consoleOutputter', () => {
  it('has required functions', async function() {
    const outputter = new ConsoleOutputter()
    expect(outputter.header).toBeInstanceOf(Function)
    expect(outputter.inner).toBeInstanceOf(Function)
    expect(outputter.footer).toBeInstanceOf(Function)
  })

  describe('header', () => {
    it('does not write anything', () => {
      const spyWrite = jest.spyOn(process.stdout, 'write')
      const outputter = new ConsoleOutputter()
      outputter.header()
      try {
        expect(spyWrite).not.toBeCalled()
      } finally {
        spyWrite.mockReset()
      }
    })
  })

  describe('inner', () => {
    it('print expected string', () => {
      const spyWrite = jest.spyOn(process.stdout, 'write')
      const cursorPosition = ESC + 14 + 'C'
      const wordRepr = 'h\u001B[31me\u001B[39mllo'
      const expected = cursorLeft + eraseEndLine + cursorPosition + wordRepr

      const outputter = new ConsoleOutputter()
      outputter.inner('hello', 1)
      try {
        expect(spyWrite).toBeCalled()
        expect(spyWrite).toBeCalledWith(expected)
      } finally {
        spyWrite.mockReset()
      }
    })
  })

  describe('footer', () => {
    it('clean line a carriage return', () => {
      const spyWrite = jest.spyOn(process.stdout, 'write')
      const expected = cursorLeft + eraseEndLine + '\n'

      const outputter = new ConsoleOutputter()
      outputter.footer()
      try {
        expect(spyWrite).toBeCalled()
        expect(spyWrite).toBeCalledWith(expected)
      } finally {
        spyWrite.mockReset()
      }
    })
  })
})
