import { ethers } from 'ethers'
import { useJustDoItContract } from '../hooks/contracts/useContract'
import { calculateGasMargin } from '../utils'

export function useJustDoItContractService() {
  const justDoItContract = useJustDoItContract()
  const addChallenge = async (
    challengeId: string,
    challengeName: string,
    deadline: Date | number | null,
    amount: string,
  ) => {
    const dline =
      deadline instanceof Date
        ? Math.round(deadline.getTime() / 1000)
        : deadline
    try {
      if (!justDoItContract) return null
      const estimatedGas = await justDoItContract.estimateGas.addChallengeETH(
        challengeId,
        challengeName,
        dline,
        {
          value: ethers.utils.parseEther(amount),
        },
      )
      const tx = await justDoItContract?.addChallengeETH(
        challengeId,
        challengeName,
        dline,
        {
          value: ethers.utils.parseEther(amount),
          gasLimit: calculateGasMargin(estimatedGas),
        },
      )
      return { tx: tx, error: null }
    } catch (error) {
      return { tx: null, error: error }
    }
  }

  const supportChallenge = async (challengeId: string, amount: string) => {
    try {
      if (!justDoItContract) return null
      const estimatedGas = await justDoItContract.estimateGas.supportChallenge(
        challengeId,
        {
          value: ethers.utils.parseEther(amount),
        },
      )
      const tx = await justDoItContract?.supportChallenge(challengeId, {
        value: ethers.utils.parseEther(amount),
        gasLimit: calculateGasMargin(estimatedGas),
      })
      return { tx: tx, error: null }
    } catch (error) {
      return { tx: null, error: error }
    }
  }

  return { addChallenge, supportChallenge }
}
