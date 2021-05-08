import { IonModal } from '@ionic/react'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import { Challenge } from '../../constants'
import { LightColor, Spacing } from '../DisplayChallenge/styles'
import { TYPE } from '../../theme'
import { useWebSharing } from '../../hooks/User/useWebSharing'
import { ButtonLight } from '../Button'

const ModalWrapper = styled(IonModal)`
  .modal-wrapper {
    --background: ${({ theme }) => theme.bg2};
  }
  .ion-page {
    height: 100%;
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
  flex-direction: column;
  align-items: center;
  height: 100%;
`

const BodyInner = styled.div`
  width: 100%;
  padding: 20px 50px;
  margin-bottom: 50px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 20px 20px;
  `};
`
const TitleLine = styled.div`
  padding-bottom: 40px;
`

const Line = styled.div`
  padding: 20px 0;
`

const InviteButton = styled(ButtonLight)`
  max-width: 250px;
`

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

  const shareChallenge = useCallback(
    (challenge: Challenge) => {
      challenge?.id &&
        challenge?.name &&
        webChallengeShare(challenge.id, challenge.name)
    },
    [webChallengeShare],
  )

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
        <HeaderRow>Ask for Supporters</HeaderRow>
      </ModalHeader>

      <BodyWrapper>
        <BodyInner>
          <TYPE.MediumHeader>
            <LightColor>
              <TitleLine>Get support from your friends and family</TitleLine>
            </LightColor>
          </TYPE.MediumHeader>
          <Line>
            <TYPE.Main>
              <LightColor>
                Invite a friend to check on your progress and hold you
                accountable.
              </LightColor>
            </TYPE.Main>
          </Line>
          <Line>
            <TYPE.Yellow>
              The more supporters you have, the higher the gains.
            </TYPE.Yellow>
          </Line>
          <Spacing />
          <Line>
            <TYPE.Main>Who will you invite?</TYPE.Main>
          </Line>
          <Spacing />
          <Center>
            <InviteButton
              onClick={() => challenge?.id && shareChallenge(challenge)}
            >
              Invite Supporters
            </InviteButton>
          </Center>
        </BodyInner>
      </BodyWrapper>
    </ModalWrapper>
  )
}
