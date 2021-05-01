import styled from 'styled-components'
import { TYPE } from '../../theme'
import { ExternalLink } from '../Link'

export const HowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px 10px;
`

export const How = styled.div`
  max-width: 500px;
  text-align: start;
`

export const ReadMore = styled.div`
  text-align: center;
  padding: 20px 10px;
`

export default function HowItWorks() {
  return (
    <>
      <HowContainer>
        <How>
          <TYPE.LargeHeader padding="20px 10px" letterSpacing="3px">
            How it works
          </TYPE.LargeHeader>
          <TYPE.Body style={{ lineHeight: '1.5' }}>
            Set a goal you want to achive, challenge yourself. Set a deadline.
            Stake your tokens.
            <li>Complete the challenge and earn reword tokens.</li>
            <li>Fail to complete and lose your staking.</li>
          </TYPE.Body>
          <ReadMore>
            <ExternalLink href={'/howitworks'}>Read more</ExternalLink>
          </ReadMore>
        </How>
      </HowContainer>
    </>
  )
}
