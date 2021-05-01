import { useCallback } from 'react'
import { Challenge, SupportChallenge } from '../../constants'
import { useGlobalState } from '../../state/global'

export function useWalletModalToggle() {
  const { state, setState } = useGlobalState()

  const toggleWalletModal = () => {
    setState((current) => ({
      ...current,
      isOpenWalletModal: !current.isOpenWalletModal,
    }))
  }
  return { isOpenWalletModal: state.isOpenWalletModal, toggleWalletModal }
}

export function useBlockNumber() {
  const { state, setState } = useGlobalState()

  const setBlockNumber = useCallback(
    (block: number) => {
      setState((current) => ({
        ...current,
        blockNumber: block,
      }))
    },
    [setState],
  )

  const blockNumber = state.blockNumber
  return { blockNumber, setBlockNumber }
}

export function useChallenges() {
  const { state, setState } = useGlobalState()

  const setChallenges = useCallback(
    (challenges: Challenge[]) => {
      const unique: Challenge[] = [
        ...new Map(challenges.map((c) => [c.id, c])).values(),
      ]
      setState((current) => ({
        ...current,
        challenges: unique,
      }))
    },
    [setState],
  )

  const challenges = state.challenges
  return { challenges, setChallenges }
}

export function useSupportChallenges() {
  const { state, setState } = useGlobalState()

  const setSupportChallenges = useCallback(
    (challenges: SupportChallenge[]) => {
      const unique: SupportChallenge[] = [
        ...new Map(
          challenges.map((c) => [`${c.id}${c.supporter}`, c]),
        ).values(),
      ]
      setState((current) => ({
        ...current,
        supportChallenges: unique,
      }))
    },
    [setState],
  )

  const supportChallenges = state.supportChallenges
  return { supportChallenges, setSupportChallenges }
}
