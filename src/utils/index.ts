import { formatBytes32String } from '@ethersproject/strings'
import { getAddress } from '@ethersproject/address'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from '../connectors'

const ETHERSCAN_PREFIXES: { [chainId in ChainId]: string } = {
  1: '',
  3: 'ropsten.',
  4: 'rinkeby.',
  5: 'goerli.',
  42: 'kovan.',
  5777: 'Ganash.',
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export function getEtherscanLink(
  chainId: ChainId,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block',
): string {
  const prefix = `https://${
    ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[1]
  }etherscan.io`

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'block': {
      return `${prefix}/block/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

// account is not optional
export function getSigner(
  library: Web3Provider,
  account: string,
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string,
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string,
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any,
  )
}

const random32String = (): string => {
  // use for challenge ID.
  // formatBytes32String:  Strings must be 31 bytes or shorter, or an exception is thrown.
  return Array.from(Array(31), () =>
    Math.floor(Math.random() * 36).toString(36),
  ).join('')
}

export const generateId = (): string => {
  return generateChallengeId()
}

export const generateChallengeId = (): string => {
  return formatBytes32String(random32String())
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000))
}

export function handleTxErrors(error: any, isOwner?: boolean): string | null {
  const DEFAULT_ERROR =
    'No action was made. Please make sure you are connected correctly and try again'
  if (error) {
    const code = error.code
    const message: string = error?.data?.message
    if (code === 4001) {
      return 'You rejected the transaction. Please try again.'
    }
    if (message?.match('Deadline too short')) {
      return 'You set the deadline too soon. Please fix it and try again'
    }
    if (message?.match('Not in a report time window')) {
      return isOwner
        ? 'Reporting time window is not met'
        : 'Voting time window is not met'
    }
    if (message?.match('No more rewards')) {
      return 'Already claimed rewards'
    }
    return DEFAULT_ERROR
  }
  return null
}

export const oneDayInSeconds = 60 * 60 * 24

export const secondsToHms = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor((seconds % 3600) % 60)

  const hDisplay = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '00:'
  const mDisplay = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:'
  const sDisplay = s > 0 ? (s < 10 ? `0${s}` : `${s}`) : '00'
  return hDisplay + mDisplay + sDisplay
}

export const secondsToHm = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)

  const hDisplay = h > 0 ? `${h}h` : ''
  const mDisplay = m > 0 ? `${m}m` : ''
  const sDisplay = seconds > 0 && seconds < 60 ? '1m' : ''
  return `${hDisplay} ${mDisplay} ${sDisplay}`
}
