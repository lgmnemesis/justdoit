import { useCallback, useEffect } from 'react'
import { ChallengeResult } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import {
  useChallenges,
  useOwnerReportResults,
  useSupportChallenges,
  useSupporterReportResults,
} from '../../hooks/Application'
import { useBlockTimestamp, useChallengesByFilter } from '../../hooks/User'

export default function ChallengesByFilterUpdater() {
  const { account } = useActiveWeb3React()
  const { challenges } = useChallenges()
  const { supportChallenges } = useSupportChallenges()
  const { ownerReportResults } = useOwnerReportResults()
  const { supporterReportResults } = useSupporterReportResults()
  const { blockTimestamp } = useBlockTimestamp()
  const { setChallengesByFilter } = useChallengesByFilter()

  const update = useCallback(() => {
    const timestamp = blockTimestamp ?? 0
    const allChallenges = challenges?.map((c) => {
      const cc = { ...c }
      const supporters = supportChallenges?.filter((sc) => sc.id === c.id)
      if (supporters) {
        if (!cc.supporters) cc.supporters = {}
        supporters?.forEach((sp) => {
          if (cc.supporters && sp.supporter) {
            cc.supporters[sp.supporter] = { ...sp }
          }
        })
      }

      const ownerResult = ownerReportResults?.find((o) => o.id === c.id)
      cc.ownerResult = ownerResult?.result ?? ChallengeResult.Initial
      cc.ownerReportPath = ownerResult?.path ?? ''

      let votedSuccess = 0
      let votedFailure = 0
      const supportersResult = supporterReportResults?.filter(
        (sr) => sr.id === c.id,
      )
      if (supportersResult) {
        if (!cc.supportersResult) cc.supportersResult = {}
        supportersResult?.forEach((sr) => {
          if (cc.supportersResult && sr.supporter) {
            cc.supportersResult[sr.supporter] = { ...sr }
            const vote = sr?.result
            if (vote === ChallengeResult.Success) {
              votedSuccess++
            } else if (vote === ChallengeResult.Failure) {
              votedFailure++
            }
          }
        })
      }
      cc.votedSuccess = votedSuccess
      cc.votedFailure = votedFailure

      return { ...cc }
    })

    const ongoingChallenges = allChallenges?.filter((c) => {
      return c.owner === account
    })

    const supportedChallenges = allChallenges?.filter((c) => {
      return (
        account && c.supporters && c.supporters[account]?.supporter === account
      )
    })

    const challengesToSupport = allChallenges?.filter((c) => {
      return (
        c.owner !== account &&
        c.deadline &&
        c.deadline.toNumber() > timestamp &&
        !(
          account &&
          c.supporters &&
          c.supporters[account]?.supporter === account
        )
      )
    })

    setChallengesByFilter(
      allChallenges,
      ongoingChallenges,
      supportedChallenges,
      challengesToSupport,
    )
  }, [
    account,
    blockTimestamp,
    challenges,
    ownerReportResults,
    supportChallenges,
    supporterReportResults,
    setChallengesByFilter,
  ])

  useEffect(() => {
    update()
  }, [update])

  return null
}
