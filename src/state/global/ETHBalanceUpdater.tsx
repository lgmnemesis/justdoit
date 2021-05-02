import { useEffect, useCallback, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import { useBlockNumber } from '../../hooks/Application'
import { useAccountETHBalance } from '../wallet'

export function ETHBalanceUpdater() {
  const { account, library, chainId } = useWeb3React()
  const { blockNumber } = useBlockNumber()

  const { setAccountEthBalance } = useAccountETHBalance()
  const prevBalanceRef = useRef(0)

  const getBalance = useCallback(async () => {
    console.log('moshe getBalance')
    if (!!library && !!account) {
      const rawBalance = await library.getBalance(account)
      const value = parseFloat(formatEther(rawBalance))
      if (value !== prevBalanceRef.current) {
        prevBalanceRef.current = value
        const valueStr = value === 0 ? '0' : value.toPrecision(4)
        setAccountEthBalance(value, valueStr)
      }
    }
  }, [account, library, setAccountEthBalance])

  useEffect(() => {
    getBalance()
  }, [blockNumber, getBalance, chainId])

  return null
}
