import { useState, useRef, useEffect } from 'react'
import { IonSlide } from '@ionic/react'
import { ChevronLeft } from 'react-feather'
import DateTimePicker from '../DateTimePicker'
import { TYPE } from '../../theme'
import GoalInput from './GoalInput'
import {
  ChallengeCard,
  SlidePrev,
  IonSlidesWrapper,
  SlideContainer,
  MarginY,
  Button,
  AmountInputContainer,
  AmountInputWrapper,
  AmountInputSection,
  AmountInputLabel,
  BalanceSection,
  BalanceLabel,
  BalanceToken,
  SpaceX,
} from './styled'
import EthLogo from '../../assets/images/ethereum-logo.png'

const slideOpts = {
  initialSlide: 2,
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
  const amountInputRef: any = useRef(null)
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

  const handleAmountInput = (event: any) => {
    const value: string = event.target.value
    if (value.match('^[0-9]*[.,]?[0-9]*$')) {
      setAmount(event.target.value)
    }
  }

  useEffect(() => {
    setSlidesDefaults()
  }, [])

  useEffect(() => {
    if (slidesIndex === 2) {
      setTimeout(() => {
        amountInputRef.current.focus()
      }, 500)
    }
  }, [slidesIndex])

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
      <TYPE.largeHeader padding="3rem 10px" letterSpacing="3px">
        {title}
      </TYPE.largeHeader>
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
              <AmountInputContainer>
                <AmountInputSection>
                  <AmountInputLabel>Amount</AmountInputLabel>
                  <AmountInputWrapper
                    ref={amountInputRef}
                    inputMode="decimal"
                    title="Token Amount"
                    autoComplete="off"
                    autoCorrect="off"
                    type="text"
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    placeholder="0.0"
                    minLength={1}
                    maxLength={79}
                    spellCheck={false}
                    value={amount}
                    onChange={handleAmountInput}
                  />
                </AmountInputSection>
                <BalanceSection>
                  <BalanceLabel>Balance:</BalanceLabel>
                  <BalanceToken>
                    <img src={EthLogo} alt="ETH" />
                    <SpaceX />
                    <p>ETH</p>
                  </BalanceToken>
                </BalanceSection>
              </AmountInputContainer>

              <MarginY />
              <Button disabled={true} onClick={slideToNext}>
                Set Your Price
              </Button>
            </SlideContainer>
          </IonSlide>
        </IonSlidesWrapper>
      </ChallengeCard>
    </>
  )
}
