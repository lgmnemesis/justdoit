import { useCallback, useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useJustDoItContract } from '../../hooks/contracts/useContract'
import { Challenge, ChallengeAddedEvent, JustDoItEvents } from '../../constants'
import { useChallenges } from '../../hooks/Application'

export default function ChallengesUpdater(): null {
  const { account, library, chainId } = useWeb3React()
  const contract = useJustDoItContract()
  const { challenges, setChallenges } = useChallenges()
  const eventName = JustDoItEvents.ChallengeAddedEvent

  const filter = useMemo(() => {
    return contract?.filters[eventName]()
  }, [contract, eventName])

  const update = useCallback(
    (cEvent) => {
      const challenge: ChallengeAddedEvent = cEvent.args
      setChallenges([...(challenges ?? []), challenge])
    },
    [challenges, setChallenges],
  )

  useEffect(() => {
    filter &&
      contract?.queryFilter(filter, 0).then((q: any) => {
        const challenges: Challenge[] = q?.map((c: any) => c.args)
        setChallenges(challenges)
      })
  }, [contract, filter, setChallenges, library, account, chainId])

  useEffect(() => {
    contract?.on(eventName, (...params) => {
      params?.length > 0 && update(params[params.length - 1])
    })

    return () => {
      contract?.off(eventName, update)
    }
  }, [update, contract, eventName, library, account, chainId])

  return null
}
