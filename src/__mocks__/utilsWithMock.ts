export const mockAdd = jest.fn() // export and mock it in test
mockAdd.mockReturnValue(12)

export default {
  add: mockAdd,
}
