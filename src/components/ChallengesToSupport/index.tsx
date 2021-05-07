import { useCallback } from 'react'
import styled from 'styled-components'
import DisplayChallenge from '../../components/DisplayChallenge'
import { Challenge } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import { useChallengesByFilter } from '../../hooks/User'
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
  const {
    allChallenges,
    ongoingChallenges,
    supportedChallenges,
    challengesToSupport,
  } = useChallengesByFilter()

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
