import { useCallback } from 'react'
import {
  Challenge,
  OwnerReportResult,
  SupportChallenge,
  SupporterReportResult,
} from '../../constants'
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
        challenges: unique([...challenges]),
      }))
    },
    [setState, unique],
  )

  const addChallenges = useCallback(
    (challenges: Challenge[]) => {
      setState((current) => ({
        ...current,
        challenges: unique([...(current?.challenges ?? []), ...challenges]),
      }))
    },
    [setState, unique],
  )

  const challenges = state.challenges
  return { challenges, addChallenges, setChallenges }
}

export function useSupportChallenges() {
  const { state, setState } = useGlobalState()

  const unique = useCallback((challenges: SupportChallenge[]) => {
    return [
      ...new Map(challenges.map((c) => [`${c.id}${c.supporter}`, c])).values(),
    ]
  }, [])

  const setSupportChallenges = useCallback(
    (challenges: SupportChallenge[]) => {
      setState((current) => ({
        ...current,
        supportChallenges: unique([
          ...(current?.supportChallenges ?? []),
          ...challenges,
        ]),
      }))
    },
    [setState, unique],
  )

  const supportChallenges = state.supportChallenges
  return { supportChallenges, setSupportChallenges }
}

export function useOwnerReportResults() {
  const { state, setState } = useGlobalState()

  const unique = useCallback((challenges: OwnerReportResult[]) => {
    return [
      ...new Map(challenges.map((c) => [`${c.id}${c.owner}`, c])).values(),
    ]
  }, [])

  const setOwnerReportResults = useCallback(
    (challenges: OwnerReportResult[]) => {
      setState((current) => ({
        ...current,
        ownerReportResults: unique([
          ...(current?.ownerReportResults ?? []),
          ...challenges,
        ]),
      }))
    },
    [setState, unique],
  )

  const ownerReportResults = state.ownerReportResults
  return { ownerReportResults, setOwnerReportResults }
}

export function useSupporterReportResults() {
  const { state, setState } = useGlobalState()

  const unique = useCallback((challenges: SupporterReportResult[]) => {
    return [
      ...new Map(challenges.map((c) => [`${c.id}${c.supporter}`, c])).values(),
    ]
  }, [])

  const setSupporterReportResults = useCallback(
    (challenges: SupporterReportResult[]) => {
      setState((current) => ({
        ...current,
        supporterReportResult: unique([
          ...(current?.supporterReportResult ?? []),
          ...challenges,
        ]),
      }))
    },
    [setState, unique],
  )

  const supporterReportResults = state.supporterReportResult
  return { supporterReportResults, setSupporterReportResults }
}
