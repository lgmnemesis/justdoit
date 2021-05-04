import ipfsClient from 'ipfs-http-client'
import { IPFS_HOST, IPFS_PORT, IPFS_URL_PREFFIX } from '../connectors'

export const ipfs = ipfsClient({
  host: IPFS_HOST,
  port: IPFS_PORT,
  protocol: 'https',
  timeout: 20000,
})

export const getIpfsUrlPreffix = () => {
  return IPFS_URL_PREFFIX
}
