import { useState, useRef, useEffect } from 'react'
import { IonSlide } from '@ionic/react'
import { ChevronLeft } from 'react-feather'
import DateTimePicker from '../DateTimePicker'
import { TYPE } from '../../theme'
import GoalInput from './GoalInput'
import AmountInput from './AmountInput'
import {
  ChallengeCard,
  SlidePrev,
  IonSlidesWrapper,
  SlideContainer,
  MarginY,
  Button,
} from './styled'

const slideOpts = {
  initialSlide: 0,
  speed: 400,
  grabCursor: false,
}

enum TITLE {
  START = 'JUST DO IT',
  STEP_ONE = `WHAT'S YOUR GOAL?`,
  WHEN = `WHEN?`,
  PAY = `YOU PAY IF YOU FAIL`,
}
let firstNextIndication = false

export default function NewChallenge() {
  const slidesRef: any = useRef(null)

  const [slidesIndex, setSlidesIndex] = useState(0)
  const [goalText, setgoalText] = useState('')
  const [amount, setAmount] = useState('')

  const setSlidesDefaults = async () => {
    handleSlidesIndex()
  }

  const handleSlidesIndex = async () => {
    const index = await slidesRef.current.getActiveIndex()
    setSlidesIndex(index)
  }

  const slideToPrev = async () => {
    await slidesRef.current.slidePrev()
    handleSlidesIndex()
  }

  const slideToNext = async () => {
    await slidesRef.current.slideNext()
    firstNextIndication = true
    handleSlidesIndex()
  }

  useEffect(() => {
    setSlidesDefaults()
  }, [])

  let title = TITLE.START
  if (slidesIndex === 0 && firstNextIndication) {
    title = TITLE.STEP_ONE
  } else if (slidesIndex === 1) {
    title = TITLE.WHEN
  } else if (slidesIndex === 2) {
    title = TITLE.PAY
  }

  return (
    <>
      <TYPE.LargeHeader padding="3rem 10px" letterSpacing="3px">
        {title}
      </TYPE.LargeHeader>
      <ChallengeCard>
        <SlidePrev hide={slidesIndex === 0} onClick={slideToPrev}>
          <ChevronLeft />
        </SlidePrev>

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
                setText={setgoalText}
                onClick={slideToNext}
              />
            </SlideContainer>
          </IonSlide>
          <IonSlide>
            <SlideContainer>
              <DateTimePicker />
              <MarginY />
              <Button onClick={slideToNext}>Set Deadline</Button>
            </SlideContainer>
          </IonSlide>
          <IonSlide>
            <SlideContainer>
              <AmountInput
                isActive={slidesIndex === 2}
                amount={amount}
                setAmount={setAmount}
              />
            </SlideContainer>
          </IonSlide>
        </IonSlidesWrapper>
      </ChallengeCard>
    </>
  )
}
