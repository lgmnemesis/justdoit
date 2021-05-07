import { IonModal } from '@ionic/react'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import { Challenge } from '../../constants'
import { ChallengeLine, Spacing } from '../DisplayChallenge/styles'
import { TYPE } from '../../theme'
import { useWebSharing } from '../../hooks/User/useWebSharing'

const ModalWrapper = styled(IonModal)`
  .modal-wrapper {
    --background: ${({ theme }) => theme.bg2};
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
  width: 100%;
  padding: 20px 50px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 20px 20px;
  `};
`

export default function ShareChallenge({
  challenge,
  isOpenModal,
  setModalStatus,
}: {
  challenge: Challenge
  isOpenModal: boolean
  setModalStatus: Dispatch<SetStateAction<boolean>>
}) {
  const { webChallengeShare } = useWebSharing()

  const shareChallenge = useCallback(() => {
    webChallengeShare()
  }, [webChallengeShare])

  const closeModal = useCallback(() => {
    setModalStatus(false)
  }, [setModalStatus])

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
        <HeaderRow>Share Challenge</HeaderRow>
      </ModalHeader>

      <BodyWrapper>
        <BodyInner>
          <ChallengeLine>
            <TYPE.Main>{challenge.name}</TYPE.Main>
          </ChallengeLine>

          <Spacing />
          <ChallengeLine></ChallengeLine>
          <button onClick={shareChallenge}>Temp share</button>
        </BodyInner>
      </BodyWrapper>
    </ModalWrapper>
  )
}
