import { useCallback, useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useJustDoItContract } from '../../hooks/contracts/useContract'
import {
  ChallengeActionType,
  JustDoItEvents,
  SupportChallenge,
  SupportChallengeEvent,
} from '../../constants'
import { useSupportChallenges } from '../../hooks/Application'
import { useInformationBar } from '../../hooks/User'

export default function SupportChallengeUpdater(): null {
  const { account, library, chainId } = useWeb3React()
  const contract = useJustDoItContract()
  const { supportChallenges, setSupportChallenges } = useSupportChallenges()
  const { informationBar, dispatchInformationBar } = useInformationBar()
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

      // Display confirmation message
      const action = informationBar?.action
      if (action?.id === challenge?.id) {
        action?.type === ChallengeActionType.SUPPORT_CHALLEGE &&
          challenge.id &&
          dispatchInformationBar(
            challenge.id,
            ChallengeActionType.CONFIRM_SUPPORT_CHALLENGE,
          )
      }

      setSupportChallenges([...(supportChallenges ?? []), challenge])
    },
    [
      supportChallenges,
      setSupportChallenges,
      informationBar,
      dispatchInformationBar,
    ],
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
