import styled from 'styled-components'
import NewChallenge from '../../components/NewChallenge'

export const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToLarge`
    flex-direction: column;
`};
`

export default function HomePage() {
  return (
    <HomeContainer>
      <NewChallenge />
    </HomeContainer>
  )
}
