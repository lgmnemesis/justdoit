import { useMemo } from 'react'
import styled from 'styled-components'
import ChallengesToSupport from '../../components/ChallengesToSupport'
import DisplayChallenge from '../../components/DisplayChallenge'
import HowItWorks from '../../components/HowItWorks'
import NewChallenge from '../../components/NewChallenge'
import { useActiveWeb3React } from '../../hooks'
import { useChallengesByFilter } from '../../hooks/User'
import { useSupportIdQueryParam } from '../../hooks/useRouterQueryParams'

export const HomeContainer = styled.div``

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 320px);
  grid-gap: 10px;
  padding: 10px;
  align-content: center;
  justify-content: center;
`

export default function HomePage() {
  const idFromQueryParam = useSupportIdQueryParam()
  const { allChallenges } = useChallengesByFilter()
  const { account } = useActiveWeb3React()

  const challengeFromQueryParams = useMemo(() => {
    return idFromQueryParam
      ? allChallenges?.find((c) => c.id === idFromQueryParam)
      : null
  }, [idFromQueryParam, allChallenges])

  return (
    <HomeContainer>
      {challengeFromQueryParams && (
        <DisplayChallenge
          challenge={challengeFromQueryParams}
          account={account}
        />
      )}

      <NewChallenge />
      <HowItWorks />
      <ChallengesToSupport />
    </HomeContainer>
  )
}
