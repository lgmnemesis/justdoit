import { useCallback } from 'react'
import { useGlobalState } from '../../state/global'

export function useIsDarkMode() {
  const { state, setState } = useGlobalState()

  const toggleDarkMode = useCallback(() => {
    setState((current) => ({
      ...current,
      isDarkMode: !current.isDarkMode,
    }))
  }, [setState])

  const isDarkMode = state.isDarkMode
  return { isDarkMode, toggleDarkMode }
}
