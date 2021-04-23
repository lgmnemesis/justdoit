import { useCallback } from 'react'
import { useGlobalState } from '../global'

export function useAccountETHBalance() {
  const { state, setState } = useGlobalState()

  const setAccountEthBalance = useCallback(
    (balance: number, balanceStr: string) => {
      setState((current) => ({
        ...current,
        acountETHBalance: balance,
        acountETHBalanceStr: balanceStr,
      }))
    },
    [setState],
  )

  return {
    balance: state.acountETHBalance,
    balanceFormatStr: state.acountETHBalanceStr,
    setAccountEthBalance,
  }
}
