import utilsProxy from '../src/utilsProxy'
import utilsWithMock, { add } from '../src/utilsWithMock'
// import { mockAdd } from '../src/__mocks__/utilsWithMock' // never see usage on Jest doc like this way

jest.mock('../src/utilsWithMock')

describe('Test utilsProxy', () => {
  beforeEach(jest.resetModules)

  describe('test mockAdd method', () => {
    beforeEach(() => {
      // for test purpose, add method will be mocked to the below method:
      //  (a: string, b: string) => parseInt(`${a}${b}`)
    })

    it('returns 12 using __mocks__', () => {
      expect(utilsProxy.add(1, 2)).toEqual(12)
      expect(utilsWithMock.add).toBeCalled()
      expect(add).toBeCalled()
      // expect(mockAdd).toBeCalled()
    })

    // it('returns -1 via rewriting utilsWithMock.add', () => {
    //   utilsWithMock.add = jest.fn().mockReturnValue(-1)
    //   expect(utilsProxy.add(1, 2)).toEqual(-1)
    //   expect(add).toBeCalled()
    // })

    xit('returns -1 via rewriting utilsWithMock.add', () => {
      utilsWithMock.add = jest.fn().mockReturnValue(-1)
      console.log(utilsProxy.add, 'xxx')
      expect(utilsProxy.add(1, 2)).toEqual(-1)
    })
  })
})
