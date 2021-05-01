import { BigNumber } from '@ethersproject/bignumber'
import { AbstractConnector } from '@web3-react/abstract-connector'
import {
  ChainId,
  fortmatic,
  injected,
  portis,
  walletconnect,
  walletlink,
} from '../connectors'

export enum JustDoItEvents {
  ChallengeAddedEvent = 'ChallengeAdded',
  SupportChallengeEvent = 'SupportChallenge',
  OwnerReportResultEvent = 'OwnerReportResult',
  SupporterReportResultEvent = 'SupporterReportResult',
}

export interface ChallengeAddedEvent {
  id?: string
  owner?: string
  name?: string
  amountStaked?: BigNumber
  token?: string
  deadline?: BigNumber
}

export interface Challenge extends ChallengeAddedEvent {
  supporters?: {
    [key: string]: SupportChallenge
  }
  ownerResult?: OwnerReportResult
}

export enum ChallengeResult {
  Initial,
  Success,
  Failure,
}

export interface ChallengeOnChain {
  amountStaked: BigNumber
  canBeRewarded: boolean
  deadline: BigNumber
  failures: BigNumber
  gotFees: boolean
  id: string
  owner: string
  resultFromOwner: ChallengeResult
  successes: BigNumber
  supporters: BigNumber
  supprtersAmountStaked: BigNumber
}

export interface SupportChallengeEvent {
  supporter?: string
  id?: string
  amountStaked?: BigNumber
}

export interface OwnerReportResultEvent {
  id?: string
  owner?: string
  result?: ChallengeResult
}

export interface SupporterReportResultEvent {
  id?: string
  supporter?: string
  result?: ChallengeResult
}

export interface SupportChallenge extends SupportChallengeEvent {}
export interface OwnerReportResult extends OwnerReportResultEvent {}
export interface SupporterReportResult extends SupporterReportResultEvent {}

export enum ChallengeActionType {
  ADD_CHALLENGE,
  SUPPORT_CHALLEGE,
  VOTE_ON_CHALLENGE,
  OWNER_REPORT_CHALLENGE,
  CONFIRM_ADD_CHALLENGE,
  CONFIRM_SUPPORT_CHALLENGE,
  CONFIRM_VOTE_ON_CHALLENGE,
  CONFIRM_OWNER_REPORT_CHALLENGE,
}

export interface InformationBarAction {
  id: string
  type: ChallengeActionType
}

export interface InformationBar {
  message: string
  isOpen: boolean
  action?: InformationBarAction
  isSpinning?: boolean
  canClose?: boolean
  isSuccessColor?: boolean
  closeOnTimeout?: number
}

export const NetworkContextName = 'NETWORK'
export const PERSIST_IS_DARK_MODE = 'darkmode'

export const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.GANACHE]: 'Ganache',
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5',
  },
  FORTMATIC: {
    connector: fortmatic,
    name: 'Fortmatic',
    iconName: 'fortmaticIcon.png',
    description: 'Login using Fortmatic hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true,
  },
  PORTIS: {
    connector: portis,
    name: 'Portis',
    iconName: 'portisIcon.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true,
  },
}
