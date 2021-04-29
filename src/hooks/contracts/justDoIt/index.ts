import { useProviderCallResult, OptionalMethodInputs } from '..'
import { useJustDoItContract } from '../useContract'

const useGetOwnerResult = (challengeId: OptionalMethodInputs) => {
  const justDoItContract = useJustDoItContract()
  const res = useProviderCallResult(
    justDoItContract,
    'getOwnerResult',
    challengeId,
  )
  console.log('moshe: getOwnerResult:', res)
  return res
}
