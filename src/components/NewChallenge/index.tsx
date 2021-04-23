import React, { useState, useRef, useEffect, useMemo } from 'react'
import { IonSlide } from '@ionic/react'
import { ChevronLeft } from 'react-feather'
import { formatBytes32String } from '@ethersproject/strings'
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
import { useActiveWeb3React } from '../../hooks'
import { useJustDoItContract } from '../../hooks/contracts/useContract'
import { ethers } from 'ethers'
import { useChallenges } from '../../hooks/Application'

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
  const { account, library } = useActiveWeb3React()
  const slidesRef: any = useRef(null)
  const [slidesIndex, setSlidesIndex] = useState(0)
  const [goalText, setgoalText] = useState('')
  const [deadLine, setDeadLine] = useState<Date | null>(new Date())
  const [amount, setAmount] = useState('')
  const justDoItContract = useJustDoItContract()
  const { challenges, setChallenges } = useChallenges()

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

  const handleAllIsDone = (isDone: boolean) => {
    if (isDone) {
      // Create a new challenge in contract
    }
  }

  const random32String = (): string => {
    // use for challenge ID.
    // formatBytes32String:  Strings must be 31 bytes or shorter, or an exception is thrown.
    return Array.from(Array(31), () =>
      Math.floor(Math.random() * 36).toString(36),
    ).join('')
  }

  // console.log(
  //   'moshe text:',
  //   goalText,
  //   goalText.length,
  //   random32String(),
  //   random32String().length,
  // )
  const methodName = 'challenges'

  const challengeID =
    '0x646a64766a356e766d6670633378787876657265616267723078676b33317000' // formatBytes32String(random32String())
  // console.log('moshe:', challengeID.length)

  const inputs: any[] = [challengeID]

  const fragment = useMemo(
    () => justDoItContract?.interface?.getFunction(methodName),
    [justDoItContract, methodName],
  )
  const calls = useMemo(() => {
    return justDoItContract && fragment
      ? [
          {
            to: justDoItContract.address,
            data: justDoItContract.interface.encodeFunctionData(
              fragment,
              inputs,
            ),
          },
        ]
      : []
  }, [justDoItContract, fragment, inputs])

  const testing = async () => {
    try {
      const dateFromBlock = (await library?.getBlock(library.blockNumber))
        ?.timestamp // Math.round(new Date().getTime() / 1000) + 60 * 60 * 25
      const date = dateFromBlock ? dateFromBlock + 60 * 60 * 25 : 0
      // console.log('date:', date)

      // const res = await justDoItContract?.addChallengeETH(
      //   challengeID,
      //   'cmoshe2',
      //   date,
      //   {
      //     value: ethers.utils.parseEther('0.0001'),
      //     gasLimit: 160000,
      //   },
      // )

      // const res2 = await justDoItContract?.supportChallenge(challengeID, {
      //   value: ethers.utils.parseEther('0.0001'),
      //   gasLimit: 160000,
      // })

      // console.log('res:', res)
      // const res = await justDoItContract?.getChallenges()

      // const ll: any = await library?.call(calls[0])
      // let res2
      // if (fragment)
      //   res2 = justDoItContract?.interface.decodeFunctionResult(fragment, ll)
      // console.log('ll:', res2)

      // let ethereum = window.ethereum
      // const defaultProvider = ethers.getDefaultProvider('kovan')
      // const provider = new ethers.providers.Web3Provider(ethereum as any)
      // const b = await provider.getBalance(
      //   '0x18891C3b727c155282ED587042FAD5827A48a8c8',
      // )
      // console.log(await provider.listAccounts())
      // console.log(account)
    } catch (error) {
      console.log('error:', error)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      testing()
    }, 5000)
  }, [])

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
    <NewChallengeContainer>
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
              <DateTimePicker date={deadLine} setDate={setDeadLine} />
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
                setAllIsDone={handleAllIsDone}
              />
            </SlideContainer>
          </IonSlide>
        </IonSlidesWrapper>
      </ChallengeCard>
    </NewChallengeContainer>
  )
}
