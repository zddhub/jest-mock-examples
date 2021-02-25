import utils from '../src/utils'

describe('Test utils.add', () => {
  beforeEach(jest.resetAllMocks)

  it('returns 3 via real method', () => {
    expect(utils.add(1, 2)).toEqual(3)
  })

  describe('test mock add method', () => {
    beforeEach(() => {
      // for test purpose, add method will be mocked to the below method:
      //  (a: string, b: string) => parseInt(`${a}${b}`)
    })
    describe('when import utils', () => {
      it('returns 12 via as', () => {
        utils.add = jest
          .fn()
          .mockImplementation((a: number, b: number): number => {
            return parseInt(`${a}${b}`)
          })
        expect(utils.add(1, 2)).toEqual(12)
      })

      it('returns 12 using spyOn', () => {
        jest
          .spyOn(utils, 'add')
          .mockImplementation((a: number, b: number): number => {
            return parseInt(`${a}${b}`)
          })
        expect(utils.add(1, 2)).toEqual(12)
      })
    })
  })
})
