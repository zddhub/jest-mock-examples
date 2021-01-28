import { add } from '../src/add'

describe('Test add', () => {
  describe('when 1 and 2 is passed', () => {
    it('returns 3', () => {
      expect(add(1, 2)).toEqual(3)
    })
  })
})
