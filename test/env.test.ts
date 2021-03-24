// import env from '../src/env' // The value from import here can't be changed

describe('Test utilsWithMock', () => {
  const OLD_ENV = process.env

  afterAll(() => {
    process.env = OLD_ENV
  })

  describe('When NODE_ENV is test', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'test'
      jest.resetModules()
    })

    it('returns test', async () => {
      const env = await import('../src/env')
      expect(env.default).toEqual('test')
    })
  })

  describe('When NODE_ENV is prod', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'prod'
      jest.resetModules()
    })
    it('returns prod', async () => {
      const env = await import('../src/env')
      expect(env.default).toEqual('prod')
    })
  })

  describe('When NODE_ENV is empty', () => {
    beforeEach(() => {
      delete process.env.NODE_ENV
      // or
      // process.env.NODE_ENV = ''
      jest.resetModules()
    })
    it('returns test', async () => {
      const env = await import('../src/env')
      expect(env.default).toEqual('test')
    })
  })
})
