import { useCallback } from 'react'
import { Challenge, OwnerReportResult, SupportChallenge } from '../../constants'
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

  const unique = useCallback((challenges: Challenge[]) => {
    return [...new Map(challenges.map((c) => [c.id, c])).values()]
  }, [])

  const setChallenges = useCallback(
    (challenges: Challenge[]) => {
      setState((current) => ({
        ...current,
        challenges: unique([...(current?.challenges ?? []), ...challenges]),
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

export function useOwnerReportResults() {
  const { state, setState } = useGlobalState()

  const setOwnerReportResults = useCallback(
    (challenges: OwnerReportResult[]) => {
      const unique: OwnerReportResult[] = [
        ...new Map(challenges.map((c) => [`${c.id}${c.owner}`, c])).values(),
      ]
      setState((current) => ({
        ...current,
        ownerReportResults: unique,
      }))
    },
    [setState],
  )

  const ownerReportResults = state.ownerReportResults
  return { ownerReportResults, setOwnerReportResults }
}
