import { useCallback, useEffect } from 'react'
import { PERSIST_IS_DARK_MODE } from '../../constants'
import { useIsDarkMode } from '../../hooks/User'

export default function DarkModeUpdater(): null {
  const { isDarkMode, toggleDarkMode } = useIsDarkMode()

  const persistDarkMode = useCallback(() => {
    let savedIsDarkMode = isDarkMode ? true : false
    try {
      if (isDarkMode === undefined) {
        // Check saved value
        const pDarkMode = localStorage.getItem(PERSIST_IS_DARK_MODE)
        if (pDarkMode) {
          savedIsDarkMode = pDarkMode === 'true'
        } else {
          // Check global system prefered value
          const match = window?.matchMedia('(prefers-color-scheme: dark)')
          savedIsDarkMode = match.matches
        }
        savedIsDarkMode && toggleDarkMode()
      }

      // Persist new value
      localStorage.setItem(PERSIST_IS_DARK_MODE, savedIsDarkMode.toString())
    } catch (error) {
      throw Error(error)
    }
  }, [isDarkMode, toggleDarkMode])

  useEffect(() => {
    persistDarkMode()
  }, [persistDarkMode])

  return null
}
