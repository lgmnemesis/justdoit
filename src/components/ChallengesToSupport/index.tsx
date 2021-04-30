import { useMemo, useCallback } from 'react'
import styled from 'styled-components'
import DisplayChallenge from '../../components/DisplayChallenge'
import { Challenge } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import { useChallenges } from '../../hooks/Application'
import { useSupportChallenges } from '../../hooks/Application'
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
  const { supportChallenges } = useSupportChallenges()
  const { challenges } = useChallenges()

  const ongoingChallenges: Challenge[] | undefined = useMemo(() => {
    return challenges?.filter((c) => {
      return c.owner === account
    })
  }, [challenges, account])

  const supportedChallenges: Challenge[] | undefined = useMemo(() => {
    const combined: Challenge[] = []
    const filtered = supportChallenges?.filter((sc) => {
      return sc.supporter === account
    })
    filtered?.forEach((supporter) => {
      const ch = { ...challenges?.find((c) => c.id === supporter.id) }
      if (ch) {
        if (!ch.supporters) ch.supporters = {}
        if (account) {
          ch.supporters[account] = { ...supporter }
          combined.push(ch)
        }
      }
    })
    return combined
  }, [challenges, supportChallenges, account])

  const challengesToSupport: Challenge[] | undefined = useMemo(() => {
    return challenges?.filter((c) => {
      return (
        c.owner !== account && !supportedChallenges.find((sc) => sc.id === c.id)
      )
    })
  }, [challenges, supportedChallenges, account])

  const handleClick = (challenge: any) => {}

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
                  onClick={handleClick(challenge)}
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
