import { useProviderCallResult } from '..'
import { useJustDoItContract } from '../useContract'

// get challenges
export function useGetChallenges(): void {
  const contract = useJustDoItContract()
  const res = useProviderCallResult(contract, 'getChallenges')
  console.log('moshe:', res)
}
