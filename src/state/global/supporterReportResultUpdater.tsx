import { useCallback, useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useJustDoItContract } from '../../hooks/contracts/useContract'
import {
  ChallengeActionType,
  JustDoItEvents,
  SupporterReportResult,
  SupporterReportResultEvent,
} from '../../constants'
import { useSupporterReportResults } from '../../hooks/Application'
import { useInformationBar } from '../../hooks/User'

export default function SupporterReportResultUpdater(): null {
  const { account, library, chainId } = useWeb3React()
  const contract = useJustDoItContract()
  const {
    supporterReportResults,
    setSupporterReportResults,
  } = useSupporterReportResults()
  const { informationBar, dispatchInformationBar } = useInformationBar()
  const eventName = JustDoItEvents.SupporterReportResultEvent

  const filter = useMemo(() => {
    return contract?.filters[eventName]()
  }, [contract, eventName])

  const update = useCallback(
    (cEvent) => {
      const challenge: SupporterReportResultEvent = cEvent.args

      // Display confirmation message
      const action = informationBar?.action
      if (action?.id === challenge?.id) {
        action?.type === ChallengeActionType.VOTE_ON_CHALLENGE &&
          challenge.id &&
          dispatchInformationBar(
            challenge.id,
            ChallengeActionType.CONFIRM_VOTE_ON_CHALLENGE,
          )
      }

      setSupporterReportResults([
        ...(supporterReportResults ?? []),
        { ...challenge },
      ])
    },
    [
      supporterReportResults,
      setSupporterReportResults,
      informationBar,
      dispatchInformationBar,
    ],
  )

  useEffect(() => {
    // History filtered events
    filter &&
      contract?.queryFilter(filter).then((q: any) => {
        const challenges: SupporterReportResult[] = q?.map((c: any) => c.args)
        setSupporterReportResults([...challenges])
      })
  }, [contract, filter, setSupporterReportResults, library, account, chainId])

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
