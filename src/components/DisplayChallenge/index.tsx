import { useState, useMemo } from 'react'
import { formatEther } from '@ethersproject/units'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Challenge } from '../../constants'

import { TYPE } from '../../theme'
import {
  ChallengeContainer,
  ChallengeCard,
  ChallengeName,
  ChallengeLine,
  ChallengeEndLine,
  ChallengeButton,
  BorderLine,
  DetailButton,
  LightColor,
  PinkColor,
  Spacing,
  ChallengeButtonContainer,
} from './styles'
import ChallengeDetails from './ChallengeDetails'

export default function DisplayChallenge({
  challenge,
  account,
  onClick,
}: {
  challenge: Challenge
  account: string | undefined | null
  onClick: any
}) {
  const [details, setDetails] = useState(false)
  const timestamp = (challenge.deadline?.toNumber() || 1) * 1000
  const deadline = useMemo(() => new Date(timestamp).toDateString(), [
    timestamp,
  ])
  const amount = useMemo(() => formatEther(challenge.amountStaked ?? 0), [
    challenge.amountStaked,
  ])
  const supportedAmount = useMemo(
    () =>
      (account &&
        formatEther(challenge.supporters?.[account]?.amountStaked ?? 0)) ||
      '0.0',
    [account, challenge.supporters],
  )

  const isSupporting = supportedAmount !== '0.0'

  const toggleDetails = () => {
    setDetails((d) => !d)
  }

  return (
    <>
      <ChallengeContainer>
        <ChallengeCard>
          <ChallengeName>
            <TYPE.LargeHeader>{challenge.name}</TYPE.LargeHeader>
          </ChallengeName>
          <Spacing />
          <ChallengeButtonContainer>
            {challenge.owner !== account && (
              <ChallengeButton disabled={false} onClick={onClick}>
                {isSupporting ? 'Cast Your Vote' : 'Support Challenge'}
              </ChallengeButton>
            )}
          </ChallengeButtonContainer>
          <Spacing />
          <ChallengeLine>
            <LightColor>Deadline </LightColor>
            {deadline}
          </ChallengeLine>
          <ChallengeLine>
            <LightColor>Challenge Stake: </LightColor>
            <ChallengeEndLine>
              <PinkColor>{amount}</PinkColor>
            </ChallengeEndLine>
          </ChallengeLine>
          {isSupporting && (
            <ChallengeLine>
              <LightColor>Your Stake: </LightColor>
              <ChallengeEndLine>
                <PinkColor>{supportedAmount}</PinkColor>
              </ChallengeEndLine>
            </ChallengeLine>
          )}
          <BorderLine />
          <ChallengeLine>
            <PinkColor></PinkColor>
            <LightColor>
              <DetailButton onClick={toggleDetails}>
                {details ? 'Hide' : 'Details'}{' '}
                {details ? <ChevronUp /> : <ChevronDown />}
              </DetailButton>
            </LightColor>
          </ChallengeLine>
          {details ? <ChallengeDetails challenge={challenge} /> : null}
        </ChallengeCard>
      </ChallengeContainer>
    </>
  )
}
