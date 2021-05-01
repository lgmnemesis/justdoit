import { useState, useMemo, useEffect } from 'react'
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
import SupportChallenge from '../SupportChallenge'

enum ButtonOptionsEnum {
  challengeOnGoing,
  challengeOverApproaching,
  submitReport,
  challengeDone,
  supportChallenge,
  castYourVote,
}

export default function DisplayChallenge({
  challenge,
  account,
}: {
  challenge: Challenge
  account: string | undefined | null
}) {
  const [details, setDetails] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [buttonOption, setButtonOption] = useState(
    ButtonOptionsEnum.supportChallenge,
  )
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

  const handleClick = () => {
    setIsOpenModal(true)
  }

  const getButtonText = () => {
    switch (buttonOption) {
      case ButtonOptionsEnum.challengeOnGoing:
        return 'Challenge in progress'
      case ButtonOptionsEnum.challengeOverApproaching:
        return 'Challenge ends soon'
      case ButtonOptionsEnum.submitReport:
        return 'Submit Report'
      case ButtonOptionsEnum.supportChallenge:
        return 'Support Challenge'
      case ButtonOptionsEnum.castYourVote:
        return 'Cast Your Vote'
      case ButtonOptionsEnum.challengeDone:
        return 'Challenge is Over'

      default:
        return ''
    }
  }

  useEffect(() => {
    const oneDay = 60 * 60 * 24
    const twoDays = 2 * oneDay
    const sevenDays = 7 * oneDay
    const nowInSeconds = Math.floor(new Date().getTime() / 1000)
    const deadline = challenge.deadline?.toNumber()
    if (!deadline) return
    const ownerTimeLeftToVote = deadline + twoDays - nowInSeconds
    const supporterTimeLeftToVote = deadline + sevenDays - nowInSeconds
    if (challenge.owner === account) {
      if (ownerTimeLeftToVote > 0 && ownerTimeLeftToVote < twoDays) {
        setButtonOption(ButtonOptionsEnum.submitReport)
      } else if (ownerTimeLeftToVote <= 0) {
        setButtonOption(ButtonOptionsEnum.challengeDone)
      } else if (ownerTimeLeftToVote > twoDays) {
        if (deadline > nowInSeconds + oneDay) {
          setButtonOption(ButtonOptionsEnum.challengeOnGoing)
        } else {
          setButtonOption(ButtonOptionsEnum.challengeOverApproaching)
        }
      }
    } else if (
      account &&
      challenge?.supporters &&
      challenge.supporters[account]?.supporter === account
    ) {
      if (supporterTimeLeftToVote > 0 && supporterTimeLeftToVote < sevenDays) {
        setButtonOption(ButtonOptionsEnum.castYourVote)
      } else if (supporterTimeLeftToVote <= 0) {
        setButtonOption(ButtonOptionsEnum.challengeDone)
      } else if (ownerTimeLeftToVote > twoDays) {
        if (deadline > nowInSeconds + oneDay) {
          setButtonOption(ButtonOptionsEnum.challengeOnGoing)
        } else {
          setButtonOption(ButtonOptionsEnum.challengeOverApproaching)
        }
      }
    }
  }, [challenge.owner, challenge.deadline, account])

  return (
    <>
      <ChallengeContainer>
        <ChallengeCard>
          <ChallengeName>
            <TYPE.LargeHeader>{challenge.name}</TYPE.LargeHeader>
          </ChallengeName>
          <Spacing />
          <ChallengeButtonContainer>
            {buttonOption === ButtonOptionsEnum.challengeDone ||
            buttonOption === ButtonOptionsEnum.challengeOnGoing ||
            buttonOption === ButtonOptionsEnum.challengeOverApproaching ? (
              buttonOption === ButtonOptionsEnum.challengeOverApproaching ? (
                <TYPE.Yellow>{getButtonText()}</TYPE.Yellow>
              ) : (
                <TYPE.Green>{getButtonText()}</TYPE.Green>
              )
            ) : (
              <ChallengeButton disabled={false} onClick={handleClick}>
                {getButtonText()}
              </ChallengeButton>
            )}
          </ChallengeButtonContainer>
          <Spacing />
          <ChallengeLine>
            <LightColor>Deadline</LightColor>
            {deadline}
          </ChallengeLine>
          <ChallengeLine>
            <LightColor>Challenge Stake</LightColor>
            <ChallengeEndLine>
              <PinkColor>{amount}</PinkColor>
            </ChallengeEndLine>
          </ChallengeLine>
          {isSupporting && (
            <ChallengeLine>
              <LightColor>Your Stake</LightColor>
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
      <SupportChallenge
        challenge={challenge}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </>
  )
}
