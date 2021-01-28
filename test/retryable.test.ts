import retryable from '../src/retryable'

const mockSuccessFn = jest
  .fn()
  .mockImplementation(() => Promise.resolve('success'))
const mockRejectFn = jest
  .fn()
  .mockImplementation(() => Promise.reject(new Error('reject')))

jest.useFakeTimers()

test('execution order example', async () => {
  const order = []
  order.push('1')
  setTimeout(() => {
    order.push('6')
  }, 0)
  const promise = new Promise((resolve) => {
    order.push('2')
    resolve(1)
  }).then(() => {
    order.push('4')
  })
  order.push('3')
  await promise
  order.push('5')
  jest.advanceTimersByTime(0)
  expect(order).toEqual(['1', '2', '3', '4', '5', '6'])
})

describe('retryable', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  it('accepts and returns args', async () => {
    const args = [1, 2, 3]
    await retryable(mockSuccessFn)(args)
    expect(mockSuccessFn).toHaveBeenCalledTimes(1)
    expect(mockSuccessFn).toBeCalledWith(args)
  })
  ;[undefined, 1, 4].forEach((attempts = 3) => {
    it(`succeeds after ${attempts} attempts`, async (done) => {
      retryable(mockRejectFn, attempts)().catch(() => {
        expect(mockRejectFn).toHaveBeenCalledTimes(1 + attempts)
        done()
      })

      for (let i = 0; i < attempts; i++) {
        await Promise.resolve()
        await Promise.resolve()
        jest.advanceTimersByTime(10000)
      }
    })
  })

  it('does not retry if n is zero', async () => {
    const attempts = 0
    try {
      await retryable(mockRejectFn, attempts)()
    } catch (err) {
      expect(err.message).toEqual('reject')
    }
    expect(mockRejectFn).toHaveBeenCalledTimes(1 + attempts)
  })

  it('throws errors', async (done) => {
    const attempts = 1
    retryable(mockRejectFn, attempts)().catch((err) => {
      expect(err.message).toEqual('reject')
      expect(mockRejectFn).toHaveBeenCalledTimes(1 + attempts)
      done()
    })
    await Promise.resolve()
    jest.advanceTimersByTime(10000)
  })

  it('rejects n less than zero', async () => {
    try {
      await retryable(mockRejectFn, -1)()
    } catch (err) {
      expect(err.message).toEqual(
        'make-retryable expects an integer greater than zero',
      )
    }
  })
})
