import { useCallback } from 'react'
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
