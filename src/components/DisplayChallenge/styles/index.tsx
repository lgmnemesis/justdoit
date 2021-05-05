import styled from 'styled-components'
import { LightCard } from '../../Card'
import { ButtonLight } from '../../Button'

export const ChallengeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const ChallengeCard = styled(LightCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 10px;
`

export const ChallengeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  padding: 10px;
  word-break: break-word;
  color: ${({ theme }) => theme.nice1};
`

export const ChallengeName = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  padding: 10px;
  word-break: break-word;
  color: ${({ theme }) => theme.nice1};
`

export const ChallengeLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`

export const ChallengeNoButtonContainer = styled.div`
  display: flex;
`

export const ChallengeButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ChallengeButton = styled(ButtonLight)`
  width: initial;
  padding: 8px 16px;
  border-radius: 10px;
`

export const Spacing = styled.div`
  width: 100%;
  padding: 10px;
`

export const LightColor = styled.span`
  color: ${({ theme }) => theme.light1};
`

export const PinkColor = styled.span`
  color: ${({ theme }) => theme.pink1};
`

export const RedColor = styled.span`
  color: ${({ theme }) => theme.red1};
`

export const BorderLine = styled.div`
  width: 100%;
  border-top: 1px solid;
  color: ${({ theme }) => theme.light1};
  margin: 20px 0;
`

export const ChallengeEndLine = styled.span`
  word-break: break-word;
`

export const DetailButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 80px;
  cursor: pointer;
`
