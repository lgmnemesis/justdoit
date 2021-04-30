import { useProviderCallResult, OptionalMethodInputs } from '..'
import { useJustDoItContract } from '../useContract'

const useGetFromContract = (
  methodName: string,
  options: OptionalMethodInputs,
) => {
  const justDoItContract = useJustDoItContract()
  return useProviderCallResult(justDoItContract, methodName, options)
}

export const useGetOwnerResult = (challengeId: string | undefined) => {
  const res = useGetFromContract('getOwnerResult', [challengeId])
  console.log('moshe: getOwnerResult:', res)
  return res
}
