import { useMemo } from 'react'
import { formatEther } from '@ethersproject/units'
import styled from 'styled-components'
import { Challenge } from '../../constants'
import { LightCard } from '../Card'
import { TYPE } from '../../theme'
import { ButtonLight } from '../Button'

export const ChallengeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const ChallengeCard = styled(LightCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 350px;
  text-align: center;
`

export const ChallengeName = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;
  text-align: start;
  word-break: break-word;
  color: ${({ theme }) => theme.nice1};
`

const ChallengeLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`

const StickToBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
`

const ChallengeButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ChallengeButton = styled(ButtonLight)`
  width: initial;
`

const Spacing = styled.div`
  padding: 10px;
`

const LightColor = styled.span`
  color: ${({ theme }) => theme.light1};
`

const PinkColor = styled.span`
  color: ${({ theme }) => theme.pink1};
`

export default function DisplayChallenge({
  challenge,
  account,
  onClick,
}: {
  challenge: Challenge
  account: string | undefined | null
  onClick: any
}) {
  const timestamp = (challenge.deadline?.toNumber() || 1) * 1000
  const deadline = useMemo(() => new Date(timestamp).toDateString(), [])
  const amount = useMemo(() => formatEther(challenge.amountStaked ?? 0), [])
  const supportedAmount = useMemo(
    () =>
      account &&
      formatEther(challenge.supporters?.[account]?.amountStaked ?? 0),
    [account],
  )

  return (
    <>
      <ChallengeContainer>
        <ChallengeCard>
          <ChallengeName>
            <TYPE.LargeHeader>{challenge.name}</TYPE.LargeHeader>
          </ChallengeName>

          <StickToBottom>
            <ChallengeButtonContainer>
              <ChallengeButton disabled={false} onClick={onClick}>
                Support Challenge
              </ChallengeButton>
            </ChallengeButtonContainer>
            <Spacing />
            <ChallengeLine>
              <LightColor>Deadline </LightColor>
              {deadline}
            </ChallengeLine>
            <ChallengeLine>
              <LightColor>Challenge Stake: </LightColor>
              <PinkColor>{amount}</PinkColor>
            </ChallengeLine>
            {supportedAmount !== '0.0' && (
              <ChallengeLine>
                <LightColor>Your Stake: </LightColor>
                <PinkColor>{supportedAmount}</PinkColor>
              </ChallengeLine>
            )}
          </StickToBottom>
        </ChallengeCard>
      </ChallengeContainer>
    </>
  )
}
