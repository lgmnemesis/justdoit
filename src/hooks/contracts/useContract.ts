import JUST_DO_IT_ABI from '../../constants/abis/JustDoIt.json'
import JDI_TOKEN_ABI from '../../constants/abis/JDIToken.json'
import { Contract } from '@ethersproject/contracts'
import { useActiveWeb3React } from '..'
import { useMemo } from 'react'
import { getContract } from '../../utils'
import {
  JDI_TOKEN_ADDRESSES,
  JUST_DO_IT_ADDRESSES,
} from '../../constants/addresses'

function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined,
      )
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useJdiTokenContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId && JDI_TOKEN_ADDRESSES[chainId],
    JDI_TOKEN_ABI,
    true,
  )
}

export function useJustDoItContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId && JUST_DO_IT_ADDRESSES[chainId],
    JUST_DO_IT_ABI,
    true,
  )
}
