import { useCallback, useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useJustDoItContract } from '../../hooks/contracts/useContract'
import {
  JustDoItEvents,
  SupportChallenge,
  SupportChallengeEvent,
} from '../../constants'
import { useSupportChallenges } from '../../hooks/Application'

export default function SupportChallengeUpdater(): null {
  const { account, library, chainId } = useWeb3React()
  const contract = useJustDoItContract()
  const { supportChallenges, setSupportChallenges } = useSupportChallenges()
  const eventName = JustDoItEvents.SupportChallengeEvent

  const eventArgs = useMemo(() => {
    return account && [account, null]
  }, [account])

  const filter = useMemo(() => {
    return eventArgs && contract?.filters[eventName](...eventArgs)
  }, [contract, eventArgs, eventName])

  const update = useCallback(
    (cEvent) => {
      const challenge: SupportChallengeEvent = cEvent.args
      setSupportChallenges([...(supportChallenges ?? []), challenge])
    },
    [supportChallenges, setSupportChallenges],
  )

  useEffect(() => {
    // History filtered events
    filter &&
      contract?.queryFilter(filter).then((q: any) => {
        const challenges: SupportChallenge[] = q?.map((c: any) => c.args)
        setSupportChallenges(challenges)
      })
  }, [contract, filter, setSupportChallenges, library, account, chainId])

  useEffect(() => {
    // Listening to future filtered events
    filter &&
      contract?.on(filter, (...params) => {
        params?.length > 0 && update(params[params.length - 1])
      })

    return () => {
      filter && contract?.off(filter, update)
    }
  }, [filter, update, contract, eventName, library, account, chainId])

  return null
}
