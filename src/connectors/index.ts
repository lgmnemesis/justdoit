import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector'
import { PortisConnector } from '@web3-react/portis-connector'

const POLLING_INTERVAL = 12000
const NETWORK_URL = process.env.REACT_APP_NETWORK_URL ?? ''

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
}

export const NETWORK_CHAIN_ID: number = parseInt(
  process.env.REACT_APP_CHAIN_ID ?? ChainId.MAINNET.toString(),
)

export const injected = new InjectedConnector({
  supportedChainIds: [
    ChainId.MAINNET,
    ChainId.ROPSTEN,
    ChainId.RINKEBY,
    ChainId.GÖRLI,
    ChainId.KOVAN,
  ],
})

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
})

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'web3-react example',
})

export const fortmatic = new FortmaticConnector({
  apiKey: process.env.FORTMATIC_API_KEY as string,
  chainId: NETWORK_CHAIN_ID,
})

export const portis = new PortisConnector({
  dAppId: process.env.PORTIS_DAPP_ID as string,
  networks: [1, 100],
})
