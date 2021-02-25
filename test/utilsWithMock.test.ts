import utilsWithMock from '../src/utilsWithMock'
import { mockAdd } from '../src/__mocks__/utilsWithMock'

jest.mock('../src/utilsWithMock')

describe('Test utilsWithMock', () => {
  beforeEach(jest.resetAllMocks)

  describe('test mockAdd method', () => {
    beforeEach(() => {
      // for test purpose, add method will be mocked to the below method:
      //  (a: string, b: string) => parseInt(`${a}${b}`)
    })

    xit('returns 12 using mockAdd', () => {
      // mockAdd.mockImplementation((a: number, b: number): number => {
      //   return parseInt(`${a}${b}`)
      // })
      mockAdd.mockReturnValue(12)

      expect(utilsWithMock.add(1, 2)).toEqual(12)
    })
  })
})
