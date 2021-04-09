import { useState, useEffect, useCallback, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'

export function useAccountETHBalance() {
  const { account, library, chainId } = useWeb3React()

  const [balance, setBalance] = useState(0)
  const prevBalanceRef = useRef(0)

  const getBalance = useCallback(async () => {
    if (!!library && !!account) {
      const rawBalance = await library.getBalance(account)
      const value = parseFloat(formatEther(rawBalance))
      if (value !== prevBalanceRef.current) {
        prevBalanceRef.current = value
        setBalance(value)
      }
    }
  }, [account, library])

  useEffect(() => {
    library?.on('block', getBalance)

    return () => {
      setBalance(0)
      library?.off('block', getBalance)
    }
  }, [account, library, getBalance, chainId])

  const balanceStr = balance === 0 ? '0' : balance.toPrecision(4)
  return {
    balance,
    balanceFormatStr: balanceStr,
  }
}
