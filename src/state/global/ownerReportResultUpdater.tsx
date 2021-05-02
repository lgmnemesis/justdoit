import { useCallback, useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useJustDoItContract } from '../../hooks/contracts/useContract'
import {
  ChallengeActionType,
  JustDoItEvents,
  OwnerReportResultEvent,
  OwnerReportResult,
} from '../../constants'
import { useOwnerReportResults } from '../../hooks/Application'
import { useInformationBar } from '../../hooks/User'

export default function OwnerReportResultUpdater(): null {
  const { account, library, chainId } = useWeb3React()
  const contract = useJustDoItContract()
  const { ownerReportResults, setOwnerReportResults } = useOwnerReportResults()
  const { informationBar, dispatchInformationBar } = useInformationBar()
  const eventName = JustDoItEvents.OwnerReportResultEvent

  const filter = useMemo(() => {
    return contract?.filters[eventName]()
  }, [contract, eventName])

  const update = useCallback(
    (cEvent) => {
      const challenge: OwnerReportResultEvent = cEvent.args

      // Display confirmation message
      const action = informationBar?.action
      if (action?.id === challenge?.id) {
        action?.type === ChallengeActionType.OWNER_REPORT_CHALLENGE &&
          challenge.id &&
          dispatchInformationBar(
            challenge.id,
            ChallengeActionType.CONFIRM_OWNER_REPORT_CHALLENGE,
          )
      }

      setOwnerReportResults([...(ownerReportResults ?? []), { ...challenge }])
    },
    [
      ownerReportResults,
      setOwnerReportResults,
      informationBar,
      dispatchInformationBar,
    ],
  )

  useEffect(() => {
    // History filtered events
    filter &&
      contract?.queryFilter(filter).then((q: any) => {
        const challenges: OwnerReportResult[] = q?.map((c: any) => c.args)
        setOwnerReportResults([...challenges])
      })
  }, [contract, filter, setOwnerReportResults, library, account, chainId])

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
