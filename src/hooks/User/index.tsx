import { useCallback } from 'react'
import { ChallengeActionType, InformationBar } from '../../constants'
import { GlobalStateInterface, useGlobalState } from '../../state/global'

export function useIsDarkMode() {
  const { state, setState } = useGlobalState()

  const toggleDarkMode = useCallback(() => {
    setState((current) => ({
      ...current,
      isDarkMode: !current.isDarkMode,
    }))
  }, [setState])

  const isDarkMode = state.isDarkMode
  return { isDarkMode, toggleDarkMode }
}

const informationBarReduceAction = (
  current: Partial<GlobalStateInterface>,
  info: InformationBar,
) => {
  const action = info.action
  const result = { ...info }
  const currentState = current.informationBar
  if (action) {
    switch (action.type) {
      case ChallengeActionType.ADD_CHALLENGE:
        result.message = 'Adding Challenge'
        result.isOpen = true
        result.isSpinning = true
        break
      case ChallengeActionType.SUPPORT_CHALLEGE:
        result.message = 'Supporting Challenge'
        result.isOpen = true
        result.isSpinning = true
        break
      case ChallengeActionType.VOTE_ON_CHALLENGE:
        result.message = 'Voting on Challenge'
        result.isOpen = true
        result.isSpinning = true
        break
      case ChallengeActionType.CONFIRM_ADD_CHALLENGE:
        if (
          currentState?.action?.id === info?.action?.id &&
          currentState?.action?.type === ChallengeActionType.ADD_CHALLENGE
        ) {
          result.message = 'Adding Challenge, Confirmed.'
          result.isOpen = true
          result.isSuccessColor = true
          result.closeOnTimeout = 3000
        }
        break
      case ChallengeActionType.CONFIRM_SUPPORT_CHALLENGE:
        if (
          currentState?.action?.id === info?.action?.id &&
          currentState?.action?.type === ChallengeActionType.SUPPORT_CHALLEGE
        ) {
          result.message = 'Supporting Challenge, Confirmed.'
          result.isOpen = true
          result.isSuccessColor = true
          result.closeOnTimeout = 3000
        }
        break
      case ChallengeActionType.CONFIRM_VOTE_ON_CHALLENGE:
        if (
          currentState?.action?.id === info?.action?.id &&
          currentState?.action?.type === ChallengeActionType.VOTE_ON_CHALLENGE
        ) {
          result.message = 'Voting on Challenge, Confirmed.'
          result.isOpen = true
          result.isSuccessColor = true
          result.closeOnTimeout = 3000
        }
        break

      default:
        break
    }
  }
  return result
}

export function useInformationBar() {
  const { state, setState } = useGlobalState()

  const setInformationBar = useCallback(
    (info: InformationBar) => {
      setState((current) => {
        return {
          ...current,
          informationBar: informationBarReduceAction(current, info),
        }
      })
    },
    [setState],
  )

  const dispatchInformationBar = useCallback(
    (id: string, type: ChallengeActionType) => {
      setInformationBar({
        message: '',
        isOpen: false,
        action: {
          id,
          type,
        },
      })
    },
    [setInformationBar],
  )

  const informationBar = state.informationBar
  return { informationBar, dispatchInformationBar, setInformationBar }
}
