import { useCallback, useEffect, useMemo, useState } from 'react'
import { formatEther } from '@ethersproject/units'
import { Challenge } from '../../constants'
import {
  useGetChallenge,
  useGetOwnerResult,
} from '../../hooks/contracts/justDoIt'
import {
  ChallengeLine,
  ChallengeEndLine,
  LightColor,
  PinkColor,
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
  const ownerResult = useGetOwnerResult(challenge.id)
  const challengeOnChain = useGetChallenge(challenge.id)
  const [timeLeftText, setTimeLeftText] = useState('')
  const [countdown, setcountdown] = useState(false)

  const supporters = useMemo(
    () =>
      challengeOnChain?.supporters && challengeOnChain.supporters.toNumber(),
    [challengeOnChain?.supporters],
  )

  const supprtersAmountStaked = useMemo(
    () =>
      challengeOnChain?.supprtersAmountStaked &&
      formatEther(challengeOnChain.supprtersAmountStaked ?? 0),
    [challengeOnChain?.supprtersAmountStaked],
  )

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
        <LightColor>Challenge ends in</LightColor>
        <ChallengeEndLine>
          <PinkColor>{timeLeftText}</PinkColor>
        </ChallengeEndLine>
      </ChallengeLine>
    </>
  )
}
