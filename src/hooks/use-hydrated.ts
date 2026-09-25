import { useSyncExternalStore } from 'react'

function subscribe() {
  return function unsubscribe() {
    return undefined
  }
}

export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}
