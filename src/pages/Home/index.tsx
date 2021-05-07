import styled from 'styled-components'
import ChallengesToSupport from '../../components/ChallengesToSupport'
import HowItWorks from '../../components/HowItWorks'
import NewChallenge from '../../components/NewChallenge'
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
  return (
    <HomeContainer>
      {!idFromQueryParam && (
        <>
          <NewChallenge />
          <HowItWorks />
        </>
      )}
      <ChallengesToSupport />
    </HomeContainer>
  )
}
