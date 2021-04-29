import styled from 'styled-components'
import ChallengesToSupport from '../../components/ChallengesToSupport'
import HowItWorks from '../../components/HowItWorks'
import NewChallenge from '../../components/NewChallenge'

export const HomeContainer = styled.div``

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 320px);
  // grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 10px;
  align-content: center;
  justify-content: center;
`

export default function HomePage() {
  return (
    <HomeContainer>
      <NewChallenge />
      <HowItWorks />
      <ChallengesToSupport />
    </HomeContainer>
  )
}
