import { useCallback, useEffect } from 'react'
import { useTimeInSecondsTicker } from '../../hooks/User'

export default function TimeInSecondsTickerUpdater(): null {
  const { setTimeInSeconds } = useTimeInSecondsTicker()

  const update = useCallback(() => {
    setTimeInSeconds(Math.floor(new Date().getTime() / 1000))
  }, [setTimeInSeconds])

  useEffect(() => {
    const interval = setInterval(() => {
      update()
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [update])

  return null
}
