import styled from 'styled-components'
import { IonModal } from '@ionic/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { Challenge, ChallengeActionType } from '../../constants'
import AmountInput from '../NewChallenge/AmountInput'
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

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const BodyInner = styled.div`
  padding: 20px;
`

export default function SupportChallenge({
  challenge,
  isOpenModal,
  setIsOpenModal,
}: {
  challenge: Challenge
  isOpenModal: boolean
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
}) {
  const [amount, setAmount] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState('')
  const { supportChallenge } = useJustDoItContractService()
  const { dispatchInformationBar } = useInformationBar()

  const handleAllIsDone = (isDone: boolean) => {
    if (isDone) {
      setIsFetching(true)
      setError('')
      setTimeout(async () => {
        const tx =
          challenge?.id && (await supportChallenge(challenge.id, amount))
        console.log('tx:', tx)
        const error = tx && handleTxErrors(tx.error)
        error && setError(error)
        tx && !error && supportChallengeDone()
        setIsFetching(false)
      }, 0)
    }
  }

  const supportChallengeDone = () => {
    challenge?.id &&
      dispatchInformationBar(challenge.id, ChallengeActionType.SUPPORT_CHALLEGE)
    setAmount('')
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
      <BodyWrapper>
        <BodyInner>
          <p>moshe {challenge.name}</p>
          <TYPE.Error error={!!error}>{error}</TYPE.Error>
          <AmountInput
            isActive={true}
            amount={amount}
            showSpinner={isFetching}
            setAmount={setAmount}
            setAllIsDone={handleAllIsDone}
          />
        </BodyInner>
      </BodyWrapper>
    </ModalWrapper>
  )
}
