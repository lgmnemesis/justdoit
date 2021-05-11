import { useCallback, useEffect, useMemo } from 'react'
import { useJustDoItContract } from '../../hooks/contracts/useContract'
import {
  Challenge,
  ChallengeActionType,
  ChallengeAddedEvent,
  JustDoItEvents,
} from '../../constants'
import { useChallenges } from '../../hooks/Application'
import { useInformationBar } from '../../hooks/User'
import { useActiveWeb3React } from '../../hooks'

export default function ChallengesUpdater(): null {
  const { account, library, chainId } = useActiveWeb3React()
  const contract = useJustDoItContract()
  const { addChallenges, setChallenges } = useChallenges()
  const { informationBar, dispatchInformationBar } = useInformationBar()
  const eventName = JustDoItEvents.ChallengeAddedEvent

  const filter = useMemo(() => {
    return contract?.filters[eventName]()
  }, [contract, eventName])

  const update = useCallback(
    (cEvent) => {
      const challenge: ChallengeAddedEvent = cEvent.args

      // Display confirmation message
      const action = informationBar?.action
      if (action?.id === challenge?.id) {
        action?.type === ChallengeActionType.ADD_CHALLENGE &&
          challenge.id &&
          dispatchInformationBar(
            challenge.id,
            ChallengeActionType.CONFIRM_ADD_CHALLENGE,
          )
      }

      addChallenges([{ ...challenge }])
    },
    [addChallenges, informationBar, dispatchInformationBar],
  )

  useEffect(() => {
    setChallenges([])
    filter &&
      contract?.queryFilter(filter, 0).then((q: any) => {
        const challenges: Challenge[] = q?.map((c: any) => c.args)
        addChallenges([...challenges])
      })
  }, [
    setChallenges,
    addChallenges,
    filter,
    contract,
    library,
    account,
    chainId,
  ])

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
