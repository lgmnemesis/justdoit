import styled from 'styled-components'
import { IonSlides } from '@ionic/react'
import { LightCard } from '../../Card'
import { ButtonPrimary } from '../../Button'

export const NewChallengeContainer = styled.div`
  text-align: center;
  padding: 30px;
`

export const ChallengeCard = styled(LightCard)`
  position: relative;
  max-width: 500px;
  min-height: 400px;
  text-align: center;
  margin: 10px 0;
  padding-left: 40px;
  padding-right: 40px;
`

export const IonSlidesWrapper = styled(IonSlides)`
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SlideMove = styled.div<{ hide: boolean }>`
  display: ${({ hide }) => (hide ? 'none' : 'initial')};
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  width: 24px;
  height: 24px;
  cursor: pointer;
`

export const SlidePrev = styled(SlideMove)`
  left: 10px;
`

export const SlideContainer = styled.div`
  width: 90%;
`

export const MarginY = styled.div`
  margin: 20px 0;
`

export const InputWrapper = styled.div`
  text-align: start;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.bg2};
  --background: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.text1};
  & ion-input {
    font-size: 25px !important;
    font-weight: ${({ theme }) => theme.fontSize1};
  }
`

export const Button = styled(ButtonPrimary)`
  min-width: 200px;
`

export const Label = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontSize1};
`

export const AmountInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.bg2};
  min-height: 60px;
`

export const AmountInputSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 15px;
`

export const AmountInputLabel = styled.div`
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontSize1};
  width: 50%;
  text-align: start;
`

export const AmountInputWrapper = styled.input`
  font-size: 24px;
  background: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.text1};
  outline: none;
  border: 0;
  width: 70%;
  text-align: start;
}
`

export const AmountLabelSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 5px;
`

export const BalanceLabel = styled.div`
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontSize1};
  width: 50%;
  text-align: end;
`

export const TokenDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  & img {
    width: 24px;
  }
  & p {
    margin: 0;
  }
`

export const SpaceX = styled.div`
  padding: 0 5px;
`
