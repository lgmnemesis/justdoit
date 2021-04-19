import { useState, useEffect, useCallback, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import { useBlockNumber } from '../../hooks/Application'

export function useAccountETHBalance() {
  const { account, library, chainId } = useWeb3React()
  const { blockNumber } = useBlockNumber()

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
  }, [blockNumber, account, library])

  useEffect(() => {
    getBalance()
  }, [getBalance, chainId])

  const balanceStr = balance === 0 ? '0' : balance.toPrecision(4)
  return {
    balance,
    balanceFormatStr: balanceStr,
  }
}
