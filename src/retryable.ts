/*
 * The original implement from here:
 * License: ISC
 * Author:  Alan Clarke <code@alz.io> (alz.io)
 * Url: https://github.com/alanclarke/make-retryable/commit/072b427ce402ed16f8b3f856d4d645caa46d17d7
 */

const inputErrorMessage = new Error(
  'make-retryable expects an integer greater than zero',
)

function retryable<T1, T2>(
  fn: (...args: T1[]) => Promise<T2>,
  attempts = 3,
): (...args: T1[]) => Promise<T2> {
  if (attempts < 0) throw inputErrorMessage

  return async function retry(...args: T1[]): Promise<T2> {
    try {
      return await fn(...args)
    } catch (err) {
      if (attempts > 0) {
        attempts--
        await new Promise((r) => setTimeout(r, 10000)) // wait 10s and then retry it
        return retry(...args)
      }
      throw err
    }
  }
}

export default retryable
