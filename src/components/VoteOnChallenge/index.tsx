import { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { IonModal } from '@ionic/react'
import { X, ThumbsUp, ThumbsDown } from 'react-feather'
import {
  Challenge,
  ChallengeActionType,
  ChallengeResult,
} from '../../constants'
import { TYPE } from '../../theme'
import { handleTxErrors } from '../../utils'
import { useInformationBar } from '../../hooks/User'
import { useJustDoItContractService } from '../../services/JustDoItContractService'

const ModalWrapper = styled(IonModal)`
  .modal-shadow {
    width: unset;
    height: unset;
  }
  .modal-wrapper {
    --background: ${({ theme }) => theme.bg2};
    width: unset;
    height: unset;
    max-width: 400px;
  }
`

const ModalHeader = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(X)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) =>
    props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit'};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const BodyInner = styled.div`
  padding: 0 20px;
  padding-bottom: 20px;
  min-width: 300px;
`

const RadioButtonsContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.bg3};
`
const VoteButton = styled.div<{ disabled: boolean; isSuccess: boolean }>`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'initial' : 'pointer')};
  background: ${({ isSuccess }) =>
    isSuccess ? 'rgba(0, 255, 0, 0.05)' : 'rgba(255, 0, 0, 0.05)'};
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
  &:hover {
    opacity: ${({ disabled }) => (disabled ? '0.4' : '0.7')};
  }
`

const SpacingX = styled.div`
  padding: 0 20px;
`

const LineContainer = styled.div`
  padding: 10px 0;
`

export default function VoteOnChallenge({
  challenge,
  isOwner,
  isOpenModal,
  setIsOpenModal,
}: {
  challenge: Challenge
  isOwner: boolean
  isOpenModal: boolean
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
}) {
  const [isFetching, setIsFetching] = useState(false)
  const [result, setResult] = useState<ChallengeResult>(0)
  const [error, setError] = useState('')
  const {
    ownerReportResult,
    supporterReportResult,
  } = useJustDoItContractService()
  const { dispatchInformationBar } = useInformationBar()

  const handleAllIsDone = (isDone: boolean) => {
    if (isDone) {
      setIsFetching(true)
      setError('')
      setTimeout(async () => {
        const tx =
          challenge?.id &&
          (isOwner
            ? await ownerReportResult(challenge.id, result)
            : await supporterReportResult(challenge.id, result))
        console.log('tx:', tx)
        const error = tx && handleTxErrors(tx.error)
        error && setError(error)
        tx && !error && voteOnChallengeDone()
        setIsFetching(false)
      }, 0)
    }
  }

  const voteOnChallengeDone = () => {
    challenge?.id &&
      dispatchInformationBar(
        challenge.id,
        ChallengeActionType.VOTE_ON_CHALLENGE,
      )
    setIsFetching(false)
    closeModal()
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }

  return (
    <ModalWrapper
      cssClass="ion-modal-fixed"
      mode="ios"
      swipeToClose={false}
      isOpen={isOpenModal}
      onDidDismiss={closeModal}
    >
      <ModalHeader>
        <CloseIcon onClick={closeModal}>
          <CloseColor />
        </CloseIcon>
        <HeaderRow>{isOwner ? 'Submit Report' : 'Cast your vote'}</HeaderRow>
      </ModalHeader>

      <BodyWrapper>
        <BodyInner>
          <LineContainer>
            <TYPE.Main>{challenge.name}</TYPE.Main>
            <TYPE.Error error={!!error}>{error}</TYPE.Error>
          </LineContainer>
          <RadioButtonsContainer>
            <VoteButton disabled={true} isSuccess={true}>
              <ThumbsUp style={{ color: 'green' }} />
            </VoteButton>
            <SpacingX />
            <VoteButton disabled={true} isSuccess={false}>
              <ThumbsDown style={{ color: 'red' }} />
            </VoteButton>
          </RadioButtonsContainer>
        </BodyInner>
      </BodyWrapper>
    </ModalWrapper>
  )
}
