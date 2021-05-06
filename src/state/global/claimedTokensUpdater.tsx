import { useCallback, useEffect } from 'react'
import { PERSIST_CLAIMED_TOKENS } from '../../constants'
import { useClaimedTokens } from '../../hooks/User'

export default function ClaimedTokensUpdater(): null {
  const { claimedTokens, setClaimedTokens } = useClaimedTokens()

  const persist = useCallback(() => {
    try {
      if (!claimedTokens) {
        const fromStorage = localStorage.getItem(PERSIST_CLAIMED_TOKENS)
        if (fromStorage) {
          setClaimedTokens(JSON.parse(fromStorage))
        }
      } else {
        // Persist new value
        localStorage.setItem(
          PERSIST_CLAIMED_TOKENS,
          JSON.stringify(claimedTokens),
        )
      }
    } catch (error) {
      throw Error(error)
    }
  }, [claimedTokens, setClaimedTokens])

  useEffect(() => {
    persist()
  }, [persist])

  return null
}
