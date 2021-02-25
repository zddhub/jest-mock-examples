import { add } from '../src/utils'
import * as _utils from '../src/utils'

jest.mock('../src/utils')

describe('Test add', () => {
  beforeEach(jest.resetAllMocks)

  describe('test mock add method', () => {
    beforeEach(() => {
      // for test purpose, add method will be mocked to the below method:
      //  (a: string, b: string) => parseInt(`${a}${b}`)
    })
    describe('when import add method', () => {
      it('returns 12 via as', () => {
        // 1. Cannot assign to 'add' because it is not a variable.ts(2539)
        // add = jest
        //   .fn()
        //   .mockImplementation((a: string, b: string) => parseInt(`${a}${b}`))

        // This way need jest.mock('../src/utils') at top
        // eslint-disable-next-line prettier/prettier
        (add as jest.Mock).mockImplementation(
          (a: number, b: number): number => {
            return parseInt(`${a}${b}`)
          },
        )
        expect(add(1, 2)).toEqual(12)
      })
    })

    describe('when import * as _utils', () => {
      it('returns 12 via as', () => {
        // 1. Cannot assign to 'add' because it is a read-only property.ts(2540)
        // _utils.add = jest
        //   .fn()
        //   .mockImplementation((a: string, b: string) => parseInt(`${a}${b}`))

        // This way need jest.mock('../src/utils') at top
        // eslint-disable-next-line prettier/prettier
        (_utils.add as jest.Mock).mockImplementation(
          (a: number, b: number): number => {
            return parseInt(`${a}${b}`)
          },
        )
        expect(_utils.add(1, 2)).toEqual(12)
      })

      it('returns 12 using spyOn', () => {
        jest
          .spyOn(_utils, 'add')
          .mockImplementation((a: number, b: number): number => {
            return parseInt(`${a}${b}`)
          })
        // add(1, 2)
        expect(_utils.add(1, 2)).toEqual(12)
      })
    })
  })
})
