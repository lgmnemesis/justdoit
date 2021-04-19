import { useCallback, useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useBlockNumber } from '../../hooks/Application'
import useDebounce from '../../hooks/useDebounce'

export default function BlockNumberUpdater(): null {
  const { account, library, chainId } = useWeb3React()
  const { setBlockNumber } = useBlockNumber()
  const [blockResult, setBlockResult] = useState(0)
  const blockResultDebouncer = useDebounce(blockResult, 100)

  const updateBlockNumber = useCallback(
    (block: number) => {
      setBlockResult(block)
    },
    [setBlockResult],
  )

  useEffect(() => {
    setBlockNumber(blockResultDebouncer)
  }, [setBlockNumber, blockResultDebouncer])

  useEffect(() => {
    library?.on('block', (block: number) => {
      updateBlockNumber(block)
    })

    return () => {
      library?.off('block', updateBlockNumber)
    }
  }, [updateBlockNumber, library, account, chainId])

  return null
}
