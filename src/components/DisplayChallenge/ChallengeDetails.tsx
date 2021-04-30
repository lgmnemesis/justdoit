import { useCallback, useEffect, useState } from 'react'
import { Challenge } from '../../constants'
import { useGetOwnerResult } from '../../hooks/contracts/justDoIt'
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
  const [timeLeftText, setTimeLeftText] = useState('')
  const [countdown, setcountdown] = useState(false)

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
      console.log('moshe 5 ##################################')
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
        <LightColor>Challenge ends in</LightColor>
        <ChallengeEndLine>
          <PinkColor>{timeLeftText}</PinkColor>
        </ChallengeEndLine>
      </ChallengeLine>
    </>
  )
}
