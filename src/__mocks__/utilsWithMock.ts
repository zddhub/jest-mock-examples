export const mockAdd = jest.fn() // export and mock it in test

const utils = {
  add: mockAdd,
}

export default utils
