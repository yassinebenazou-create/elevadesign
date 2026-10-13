import { useSyncExternalStore } from 'react'

export function useHasMounted() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const timeout = window.setTimeout(onStoreChange, 0)

      return () => window.clearTimeout(timeout)
    },
    () => true,
    () => false,
  )
}
