import { useCallback, useEffect, useMemo, useState } from 'react'
import { formatEther } from '@ethersproject/units'
import { BigNumber } from '@ethersproject/bignumber'
import { Challenge } from '../../constants'
import {
  ChallengeLine,
  ChallengeEndLine,
  LightColor,
  PinkColor,
  RedColor,
} from './styles'

const secondsToHms = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor((seconds % 3600) % 60)

  const hDisplay = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '00:'
  const mDisplay = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:'
  const sDisplay = s > 0 ? (s < 10 ? `0${s}` : `${s}`) : '00'
  return hDisplay + mDisplay + sDisplay
}

export default function ChallengeDetails({
  challenge,
}: {
  challenge: Challenge
}) {
  const [timeLeftText, setTimeLeftText] = useState('')
  const [countdown, setcountdown] = useState(false)

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

  const displayTimeLeft = useCallback((timestamp: number) => {
    const nowInSeconds = new Date().getTime() / 1000
    const timeLeftInSeconds = timestamp - nowInSeconds
    const days = Math.floor(timeLeftInSeconds / (60 * 60 * 24))
    let result
    if (days > 1) {
      result = `${days} days`
    } else if (timeLeftInSeconds >= 0) {
      result = secondsToHms(timeLeftInSeconds)
      setcountdown(true)
    } else {
      setcountdown(false)
      result = ''
    }
    setTimeLeftText(result)
  }, [])

  useEffect(() => {
    !countdown &&
      challenge.deadline &&
      displayTimeLeft(challenge.deadline?.toNumber())
    let interval: NodeJS.Timeout
    if (countdown) {
      interval = setInterval(() => {
        challenge.deadline && displayTimeLeft(challenge.deadline?.toNumber())
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [challenge, countdown, displayTimeLeft])

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
        {timeLeftText !== '' && <LightColor>Challenge ends in</LightColor>}
        {timeLeftText === '' && <RedColor>Time is up</RedColor>}
        <ChallengeEndLine>
          <PinkColor>{timeLeftText}</PinkColor>
        </ChallengeEndLine>
      </ChallengeLine>
    </>
  )
}
