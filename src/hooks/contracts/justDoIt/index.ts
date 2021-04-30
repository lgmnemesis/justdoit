import { useProviderCallResult, OptionalMethodInputs } from '..'
import { ChallengeOnChain, ChallengeResult } from '../../../constants'
import { useJustDoItContract } from '../useContract'

const useGetFromContract = (
  methodName: string,
  options: OptionalMethodInputs,
) => {
  const justDoItContract = useJustDoItContract()
  return useProviderCallResult(justDoItContract, methodName, options)
}

export const useGetChallenge = (challengeId: string | undefined) => {
  const res: any = useGetFromContract('challenges', [challengeId])
  const challengeOnChain: ChallengeOnChain = res?.result && { ...res.result }
  return challengeOnChain
}

export const useGetOwnerResult = (challengeId: string | undefined) => {
  const res: any = useGetFromContract('getOwnerResult', [challengeId])
  const ownerResult: ChallengeResult = res?.result && { ...res.result }['0']
  return ownerResult
}
