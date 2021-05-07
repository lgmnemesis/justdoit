import styled from 'styled-components'
import ChallengesToSupport from '../../components/ChallengesToSupport'
import HowItWorks from '../../components/HowItWorks'
import InvitationToSupport from '../../components/InvitationToSupport'
import NewChallenge from '../../components/NewChallenge'

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
  return (
    <HomeContainer>
      <InvitationToSupport />
      <NewChallenge />
      <HowItWorks />
      <ChallengesToSupport />
    </HomeContainer>
  )
}
