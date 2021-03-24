import utilsWithMock from '../src/utilsWithMock'
import { mockAdd } from '../src/__mocks__/utilsWithMock'

jest.mock('../src/utilsWithMock')

describe('Test utilsWithMock', () => {
  beforeEach(jest.resetModules)

  describe('test mockAdd method', () => {
    beforeEach(() => {
      // for test purpose, add method will be mocked to the below method:
      //  (a: string, b: string) => parseInt(`${a}${b}`)
    })

    it('returns 12 using __mocks__', () => {
      expect(utilsWithMock.add(1, 2)).toEqual(12)
    })

    xit('returns -1 using mockAdd', () => {
      mockAdd.mockReturnValue(-1)
      const result = utilsWithMock.add(1, 2)
      expect(mockAdd).toBeCalled()
      expect(result).toEqual(-1)
    })
  })
})
