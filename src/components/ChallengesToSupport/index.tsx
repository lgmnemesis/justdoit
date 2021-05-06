import { useMemo, useCallback } from 'react'
import styled from 'styled-components'
import DisplayChallenge from '../../components/DisplayChallenge'
import { Challenge, ChallengeResult } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import {
  useChallenges,
  useSupportChallenges,
  useOwnerReportResults,
  useSupporterReportResults,
} from '../../hooks/Application'
import { useBlockTimestamp } from '../../hooks/User'
import { TYPE } from '../../theme'

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 360px);
  grid-gap: 10px;
  padding: 10px;
  align-content: center;
  justify-content: center;
  align-items: start;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  grid-template-columns: repeat(auto-fit, 100%);
`};
`

const Container = styled.div`
  margin: 20px 0;
`

const Spacing = styled.div`
  padding: 40px 0;
`

export default function ChallengesToSupport() {
  const { account } = useActiveWeb3React()
  const { challenges } = useChallenges()
  const { supportChallenges } = useSupportChallenges()
  const { ownerReportResults } = useOwnerReportResults()
  const { supporterReportResults } = useSupporterReportResults()
  const { blockTimestamp } = useBlockTimestamp()

  const allChallenges: Challenge[] | undefined = useMemo(() => {
    // console.count('moshe allChallenges 1')
    return challenges?.map((c) => {
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

      // console.count('moshe allChallenges 2')
      return { ...cc }
    })
  }, [
    challenges,
    supportChallenges,
    ownerReportResults,
    supporterReportResults,
  ])

  const ongoingChallenges: Challenge[] | undefined = useMemo(() => {
    // console.count('moshe ongoingChallenges 1')
    return allChallenges?.filter((c) => {
      return c.owner === account
    })
  }, [allChallenges, account])

  const supportedChallenges: Challenge[] | undefined = useMemo(() => {
    // console.count('moshe supportedChallenges 1')
    return allChallenges?.filter((c) => {
      return (
        account && c.supporters && c.supporters[account]?.supporter === account
      )
    })
  }, [allChallenges, account])

  const challengesToSupport: Challenge[] | undefined = useMemo(() => {
    // console.count('moshe challengesToSupport 1')
    const timestamp = blockTimestamp ?? 0
    return allChallenges?.filter((c) => {
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
  }, [allChallenges, blockTimestamp, account])

  const renderSection = useCallback(
    (challenges: Challenge[], title: string) => {
      return (
        <Container>
          <TYPE.LargeHeader padding="20px 20px" letterSpacing="3px">
            {title}
          </TYPE.LargeHeader>
          <GridContainer>
            {challenges.map((challenge) => {
              return challenge.id ? (
                <DisplayChallenge
                  key={challenge.id}
                  challenge={challenge}
                  account={account}
                />
              ) : null
            })}
          </GridContainer>
        </Container>
      )
    },
    [account],
  )

  return (
    <>
      {ongoingChallenges && ongoingChallenges?.length > 0 && (
        <>
          {renderSection(ongoingChallenges, 'My Challenges')}
          <Spacing />
        </>
      )}
      {supportedChallenges && supportedChallenges?.length > 0 && (
        <>
          {renderSection(supportedChallenges, 'My Supported Challenges')}
          <Spacing />
        </>
      )}
      {challengesToSupport &&
        challengesToSupport?.length > 0 &&
        renderSection(challengesToSupport, 'Challenges to Support')}
    </>
  )
}
