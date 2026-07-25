import { debounce } from '@/utils/debounce'
import { useCallback, useRef, useState } from 'react'

export function useDebouncedState<T>(initialValue: T, delay = 50) {
  const [value, setValue] = useState<T>(initialValue)
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue)

  const debouncedSetValueRef = useRef(
    debounce((newValue: T) => {
      setDebouncedValue(newValue)
    }, delay)
  )

  const setValueAndDebounce = useCallback(
    (newValue: React.SetStateAction<T>) => {
      setValue((prev) => {
        if (typeof newValue === 'function') {
          const nextValue = (newValue as (prev: T) => T)(prev)
          debouncedSetValueRef.current(nextValue)
          return nextValue
        }

        debouncedSetValueRef.current(newValue)
        return newValue
      })
    },
    []
  )

  return [value, setValueAndDebounce, debouncedValue] as const
}
