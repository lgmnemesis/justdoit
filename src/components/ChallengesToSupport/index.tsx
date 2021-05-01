import { useMemo, useCallback } from 'react'
import styled from 'styled-components'
import DisplayChallenge from '../../components/DisplayChallenge'
import { Challenge } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import {
  useChallenges,
  useSupportChallenges,
  useOwnerReportResults,
} from '../../hooks/Application'
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

  const allChallenges: Challenge[] | undefined = useMemo(() => {
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
      if (ownerResult) {
        if (!cc.ownerResult) cc.ownerResult = {}
        cc.ownerResult = { ...ownerResult }
      }
      return { ...cc }
    })
  }, [challenges, supportChallenges, ownerReportResults])

  const ongoingChallenges: Challenge[] | undefined = useMemo(() => {
    return allChallenges?.filter((c) => {
      return c.owner === account
    })
  }, [allChallenges, account])

  const supportedChallenges: Challenge[] | undefined = useMemo(() => {
    return allChallenges?.filter((c) => {
      return (
        account && c.supporters && c.supporters[account]?.supporter === account
      )
    })
  }, [allChallenges, account])

  const challengesToSupport: Challenge[] | undefined = useMemo(() => {
    return allChallenges?.filter((c) => {
      return (
        c.owner !== account &&
        !(
          account &&
          c.supporters &&
          c.supporters[account]?.supporter === account
        )
      )
    })
  }, [allChallenges, account])

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
      {ongoingChallenges &&
        ongoingChallenges?.length > 0 &&
        renderSection(ongoingChallenges, 'My Ongoing Challenges')}
      <Spacing />
      {supportedChallenges &&
        supportedChallenges?.length > 0 &&
        renderSection(supportedChallenges, 'My Supported Challenges')}
      <Spacing />
      {challengesToSupport &&
        challengesToSupport?.length > 0 &&
        renderSection(challengesToSupport, 'Challenges to Support')}
    </>
  )
}
