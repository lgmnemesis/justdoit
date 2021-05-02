import { useCallback, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useBlockNumber } from '../../hooks/Application'
import { Web3Provider } from '@ethersproject/providers'
import { useBlockTimestamp } from '../../hooks/User'

export default function BlockNumberUpdater(): null {
  const { library } = useWeb3React()
  const { blockNumber } = useBlockNumber()
  const { setBlockTimestamp } = useBlockTimestamp()

  const updateBlockTimestamp = useCallback(
    async (blockNumber: number) => {
      const provider: Web3Provider = library
      const blockData = await provider?.getBlock(blockNumber)
      blockData && setBlockTimestamp(blockData.timestamp)
      console.log('moshe block timestamp:', blockData?.timestamp)
    },
    [setBlockTimestamp, library],
  )

  useEffect(() => {
    blockNumber && updateBlockTimestamp(blockNumber)
  }, [blockNumber, updateBlockTimestamp])

  return null
}
