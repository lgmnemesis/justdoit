import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { IonSlide } from '@ionic/react'
import { ChevronLeft } from 'react-feather'
import DateTimePicker from '../DateTimePicker'
import { TYPE } from '../../theme'
import GoalInput from './GoalInput'
import AmountInput from './AmountInput'
import {
  NewChallengeContainer,
  ChallengeCard,
  SlidePrev,
  IonSlidesWrapper,
  SlideContainer,
  MarginY,
  Button,
} from './styled'
import { useJustDoItContractService } from '../../services/JustDoItContractService'
import {
  generateChallengeId,
  handleTxErrors,
  oneDayInSeconds,
} from '../../utils'
import { useBlockTimestamp, useInformationBar } from '../../hooks/User'
import { ChallengeActionType } from '../../constants'

const slideOpts = {
  initialSlide: 0,
  speed: 400,
  grabCursor: false,
}

enum TITLE {
  START = 'Yes, You Can. Just do it',
  STEP_ONE = `WHAT'S YOUR GOAL?`,
  WHEN = `WHEN?`,
  PAY = `YOU PAY IF YOU FAIL`,
}
let firstNextIndication = false

export default function NewChallenge() {
  const slidesRef: any = useRef(null)
  const [slidesIndex, setSlidesIndex] = useState(0)
  const [goalText, setGoalText] = useState('')
  const [deadLine, setDeadLine] = useState<Date | null>()
  const [amount, setAmount] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState('')
  const { dispatchInformationBar } = useInformationBar()
  const { addChallenge } = useJustDoItContractService()
  const { blockTimestamp } = useBlockTimestamp()

  const defaultDeadline = useMemo(() => {
    const timestamp = blockTimestamp
      ? blockTimestamp * 1000
      : new Date().getTime()
    const twoDaysFromNow = timestamp + oneDayInSeconds * 2 * 1000
    return new Date(twoDaysFromNow) // 2 days from today
  }, [blockTimestamp])

  const minDate = useMemo(() => defaultDeadline, [defaultDeadline])

  const handleSlidesIndex = useCallback(async () => {
    setError('')
    const index = await slidesRef.current.getActiveIndex()
    setSlidesIndex(index)
  }, [])

  const setSlidesDefaults = useCallback(async () => {
    handleSlidesIndex()
  }, [handleSlidesIndex])

  const slideToPrev = useCallback(async () => {
    await slidesRef.current.slidePrev()
    handleSlidesIndex()
  }, [handleSlidesIndex])

  const slideToNext = useCallback(async () => {
    await slidesRef.current.slideNext()
    firstNextIndication = true
    handleSlidesIndex()
  }, [handleSlidesIndex])

  const challengeWasAdded = useCallback(
    async (challengeId: string) => {
      dispatchInformationBar(challengeId, ChallengeActionType.ADD_CHALLENGE)
      setSlidesIndex(0)
      setGoalText('')
      setDeadLine(defaultDeadline)
      setAmount('')
      setIsFetching(false)
      await slidesRef.current.slideTo(0, 0)
      setSlidesDefaults()
    },
    [defaultDeadline, dispatchInformationBar, setSlidesDefaults],
  )

  const handleAllIsDone = useCallback(
    async (isDone: boolean) => {
      if (isDone) {
        setIsFetching(true)
        setError('')
        const endTime = deadLine || defaultDeadline
        const challengeId = generateChallengeId()
        const tx = await addChallenge(challengeId, goalText, endTime, amount)
        console.log('tx:', tx)
        const error = handleTxErrors(tx?.error)
        error && setError(error)
        !error && challengeWasAdded(challengeId)
        setIsFetching(false)
      }
    },
    [
      addChallenge,
      amount,
      challengeWasAdded,
      goalText,
      deadLine,
      defaultDeadline,
    ],
  )

  useEffect(() => {
    setSlidesDefaults()
  }, [setSlidesDefaults])

  let title = TITLE.START
  if (slidesIndex === 0 && firstNextIndication) {
    title = TITLE.STEP_ONE
  } else if (slidesIndex === 1) {
    title = TITLE.WHEN
  } else if (slidesIndex === 2) {
    title = TITLE.PAY
  }

  return (
    <NewChallengeContainer>
      <TYPE.LargeHeader padding="20px 10px" letterSpacing="3px">
        {title}
      </TYPE.LargeHeader>
      <ChallengeCard>
        <SlidePrev hide={slidesIndex === 0} onClick={slideToPrev}>
          <ChevronLeft />
        </SlidePrev>

        <TYPE.Error error={!!error}>{error}</TYPE.Error>
        <IonSlidesWrapper
          ref={slidesRef}
          pager={true}
          options={slideOpts}
          onIonSlideWillChange={handleSlidesIndex}
        >
          <IonSlide>
            <SlideContainer>
              <GoalInput
                isActive={slidesIndex === 0}
                text={goalText}
                setText={setGoalText}
                onClick={slideToNext}
              />
            </SlideContainer>
          </IonSlide>
          <IonSlide>
            <SlideContainer>
              <DateTimePicker
                date={deadLine || defaultDeadline}
                setDate={setDeadLine}
                minDate={minDate}
              />
              <MarginY />
              <Button onClick={slideToNext}>Set Deadline</Button>
            </SlideContainer>
          </IonSlide>
          <IonSlide>
            <SlideContainer>
              <AmountInput
                isActive={slidesIndex === 2}
                amount={amount}
                showSpinner={isFetching}
                setAmount={setAmount}
                setAllIsDone={handleAllIsDone}
              />
            </SlideContainer>
          </IonSlide>
        </IonSlidesWrapper>
      </ChallengeCard>
    </NewChallengeContainer>
  )
}
