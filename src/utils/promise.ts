type Result<T> = [T, null] | [null, Error]

interface WrapOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  finally?: () => void
}

export type ReturnWrap<T, U = object> = (
  config: WrapOptions<T> & U
) => Promise<Result<T>>

async function wrap<T>(
  promise: Promise<T>,
  config?: WrapOptions<T>
): Promise<Result<T>> {
  try {
    const data = await promise
    config?.onSuccess?.(data)
    return [data, null]
  } catch (caught) {
    const error = caught as Error
    config?.onError?.(error)
    return [null, error]
  } finally {
    config?.finally?.()
  }
}

function wrapSync<T>(
  fn: () => T,
  onSuccess?: (data: T) => void,
  onError?: (error: Error) => void,
  finallyFn?: () => void
): Result<T> {
  try {
    const data = fn()
    onSuccess?.(data)
    return [data, null]
  } catch (caught) {
    const error = caught as Error
    onError?.(error)
    return [null, error]
  } finally {
    finallyFn?.()
  }
}

export { wrap, wrapSync, type Result }
