import { useEffect, useMemo, useState } from 'react'
import { formatEther } from '@ethersproject/units'
import { BigNumber } from '@ethersproject/bignumber'
import { Challenge } from '../../constants'
import {
  ChallengeLine,
  ChallengeEndLine,
  LightColor,
  PinkColor,
} from './styles'
import { useTimeInSecondsTicker } from '../../hooks/User'
import { oneDayInSeconds, secondsToHms } from '../../utils'
import { TYPE } from '../../theme'

export default function ChallengeDetails({
  challenge,
}: {
  challenge: Challenge
}) {
  const { timeInSeconds } = useTimeInSecondsTicker()
  const [timeLeftText, setTimeLeftText] = useState('')

  const supporters = useMemo(
    () => challenge?.supporters && Object.keys(challenge.supporters).length,
    [challenge.supporters],
  )

  const supprtersAmountStaked = useMemo(() => {
    const sp = challenge?.supporters
    let amountStaked = BigNumber.from('0')
    for (const key in sp) {
      const amount = sp[key].amountStaked
      if (amount) {
        amountStaked = amountStaked.add(amount)
      }
    }
    return formatEther(amountStaked ?? 0)
  }, [challenge.supporters])

  useEffect(() => {
    const timestamp = challenge.deadline?.toNumber()
    if (!(timeInSeconds && timestamp)) return
    const timeLeft = timestamp - timeInSeconds
    const days = Math.floor(timeLeft / oneDayInSeconds)
    let result
    if (days > 1) {
      result = `${days} days`
    } else if (timeLeft > 0) {
      result = secondsToHms(timeLeft)
    } else {
      result = '00:00:00'
    }
    setTimeLeftText(result)
  }, [timeInSeconds, challenge.deadline])

  return (
    <>
      <ChallengeLine>
        <LightColor>Supporters</LightColor>
        <ChallengeEndLine>
          <PinkColor>{supporters}</PinkColor>
        </ChallengeEndLine>
      </ChallengeLine>

      {supprtersAmountStaked && supprtersAmountStaked !== '0.0' && (
        <ChallengeLine>
          <LightColor>Supporters Stake</LightColor>
          <ChallengeEndLine>
            <PinkColor>{supprtersAmountStaked}</PinkColor>
          </ChallengeEndLine>
        </ChallengeLine>
      )}

      <ChallengeLine>
        {timeLeftText !== '00:00:00' ? (
          <LightColor>Challenge ends in</LightColor>
        ) : (
          <TYPE.Yellow>Challenge ended</TYPE.Yellow>
        )}

        <ChallengeEndLine>
          {timeLeftText !== '00:00:00' ? (
            <PinkColor>{timeLeftText}</PinkColor>
          ) : (
            <TYPE.Yellow>{timeLeftText}</TYPE.Yellow>
          )}
        </ChallengeEndLine>
      </ChallengeLine>
    </>
  )
}
