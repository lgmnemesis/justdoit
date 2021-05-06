import { IonModal } from '@ionic/react'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import { Challenge } from '../../constants'
import { useJustDoItContractService } from '../../services/JustDoItContractService'
import { handleTxErrors } from '../../utils'
import { formatEther } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import {
  ChallengeEndLine,
  ChallengeLine,
  LightColor,
  PinkColor,
  Spacing,
} from '../DisplayChallenge/styles'
import { TYPE } from '../../theme'
import { ButtonSecondary } from '../Button'
import Loader from '../Loader'
import { useActiveWeb3React } from '../../hooks'
import { JDI_TOKEN_ADDRESSES } from '../../constants/addresses'
import { useClaimedTokens } from '../../hooks/User'

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

const LineDiv = styled.div`
  width: 100%;
  border-top: 1px solid;
  margin: 10px 0;
  opacity: 0.4;
`

const Spinner = styled(Loader)`
  margin: 0 10px;
`

export default function ClaimTokens({
  challenge,
  isOwner,
  account,
  isOpenModal,
  setModalStatus,
}: {
  challenge: Challenge
  isOwner: boolean
  account: string | undefined | null
  isOpenModal: boolean
  setModalStatus: Dispatch<SetStateAction<boolean>>
}) {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState('')
  const [rewards, setRewards] = useState<BigNumber[]>()
  const {
    getOwnerRewards,
    getSupporterRewards,
    collectOwnerRewards,
    collectSupporterRewards,
  } = useJustDoItContractService()
  const { chainId } = useActiveWeb3React()
  const { claimedTokens, markClaimedTokens } = useClaimedTokens()

  const initialStake = useMemo(
    () => formatEther(challenge?.amountStaked ? challenge.amountStaked : 0),
    [challenge.amountStaked],
  )

  const supportersStake = useMemo(
    () =>
      formatEther(
        rewards && !rewards[0].isZero && challenge?.amountStaked
          ? rewards[0].sub(challenge.amountStaked)
          : 0,
      ),
    [rewards, challenge.amountStaked],
  )

  const supporterStake = useMemo(
    () =>
      account &&
      formatEther(challenge.supporters?.[account]?.amountStaked ?? 0),
    [account, challenge.supporters],
  )

  const ethRewards = useMemo(() => formatEther(rewards ? rewards[0] : 0), [
    rewards,
  ])

  const tokenRewards = useMemo(() => formatEther(rewards ? rewards[1] : 0), [
    rewards,
  ])

  const jdiTokenAddress = useMemo(
    () => (chainId ? JDI_TOKEN_ADDRESSES[chainId] : ''),
    [chainId],
  )

  const areClaimedTokens = useMemo(
    () => claimedTokens && claimedTokens[`${challenge?.id}${account}`],
    [account, challenge?.id, claimedTokens],
  )

  const closeModal = () => {
    reset()
    setModalStatus(false)
  }

  const reset = () => {
    setError('')
  }

  const getRewards = useCallback(async () => {
    if (rewards || isFetching) return
    setIsFetching(true)
    setError('')
    const tx =
      challenge?.id &&
      (isOwner
        ? await getOwnerRewards(challenge.id)
        : await getSupporterRewards(challenge.id))
    const error = tx && handleTxErrors(tx.error, isOwner)
    error && setError(error)
    tx && setRewards(tx.tx)
    setIsFetching(false)
  }, [
    challenge.id,
    getOwnerRewards,
    getSupporterRewards,
    isOwner,
    rewards,
    isFetching,
  ])

  const handleWithdraw = useCallback(async () => {
    setIsFetching(true)
    setError('')
    const tx =
      challenge?.id &&
      (isOwner
        ? await collectOwnerRewards(challenge.id)
        : await collectSupporterRewards(challenge.id))
    const error = tx && handleTxErrors(tx.error, isOwner)
    error && setError(error)
    if (!error || error === 'Already claimed rewards') {
      challenge?.id && account && markClaimedTokens(challenge.id, account)
    }
    setIsFetching(false)
  }, [
    isOwner,
    challenge.id,
    collectOwnerRewards,
    collectSupporterRewards,
    account,
    markClaimedTokens,
  ])

  useEffect(() => {
    isOpenModal && getRewards()
  }, [isOpenModal, getRewards])

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
        <HeaderRow>Claim Tokens</HeaderRow>
      </ModalHeader>

      <BodyWrapper>
        <BodyInner>
          <ChallengeLine>
            <TYPE.Main>{challenge.name}</TYPE.Main>
          </ChallengeLine>
          <ChallengeLine>
            <TYPE.Error error={!!error}>{error}</TYPE.Error>
          </ChallengeLine>
          {isOwner && (
            <>
              <ChallengeLine>
                <LightColor>Initial Stake</LightColor>
                <ChallengeEndLine>
                  <PinkColor>{initialStake} ETH</PinkColor>
                </ChallengeEndLine>
              </ChallengeLine>

              <ChallengeLine>
                <LightColor>Supporters Stake</LightColor>
                <ChallengeEndLine>
                  <PinkColor>{supportersStake} ETH</PinkColor>
                </ChallengeEndLine>
              </ChallengeLine>

              <ChallengeLine>
                <LineDiv />
              </ChallengeLine>

              <ChallengeLine>
                <LightColor>Total ETH Yield</LightColor>
                <ChallengeEndLine>
                  <PinkColor>{ethRewards}</PinkColor>
                </ChallengeEndLine>
              </ChallengeLine>

              <ChallengeLine>
                <LightColor>JDI Tokens Reward</LightColor>
                <ChallengeEndLine>
                  <PinkColor>{tokenRewards}</PinkColor>
                </ChallengeEndLine>
              </ChallengeLine>
            </>
          )}
          {!isOwner && (
            <>
              <ChallengeLine>
                <LightColor>Your Stake</LightColor>
                <ChallengeEndLine>
                  <PinkColor>{supporterStake} ETH</PinkColor>
                </ChallengeEndLine>
              </ChallengeLine>

              <ChallengeLine>
                <LineDiv />
              </ChallengeLine>

              <ChallengeLine>
                <LightColor>Total ETH Yield</LightColor>
                <ChallengeEndLine>
                  <PinkColor>{ethRewards}</PinkColor>
                </ChallengeEndLine>
              </ChallengeLine>

              <ChallengeLine>
                <LightColor>JDI Tokens Reward</LightColor>
                <ChallengeEndLine>
                  <PinkColor>{tokenRewards}</PinkColor>
                </ChallengeEndLine>
              </ChallengeLine>
            </>
          )}
          <Spacing />
          <ChallengeLine>
            <ButtonSecondary
              disabled={
                areClaimedTokens || isFetching || tokenRewards === '0.0'
              }
              onClick={() => handleWithdraw()}
            >
              {tokenRewards === '0.0'
                ? 'No Tokens to Claim'
                : areClaimedTokens
                ? 'Tokens Are in Your Wallet'
                : 'Claim Tokens'}
              {isFetching && <Spinner />}
            </ButtonSecondary>
          </ChallengeLine>
          <Spacing />
          <ChallengeLine>
            <TYPE.Blue>JDI token contract address</TYPE.Blue>
          </ChallengeLine>
          <TYPE.Small style={{ fontWeight: 200 }}>{jdiTokenAddress}</TYPE.Small>
        </BodyInner>
      </BodyWrapper>
    </ModalWrapper>
  )
}
