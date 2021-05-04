import { useCallback } from 'react'
import { ipfs, getIpfsUrlPreffix } from '../../services/IpfsService'

export function useIpfs() {
  const addData = useCallback(async (data: any) => {
    try {
      return (await ipfs.add(data)).path
    } catch (error) {
      console.error(error)
      return null
    }
  }, [])

  const getData = (data: any) => {
    return ipfs.get(data)
  }

  return { ipfs, getIpfsUrlPreffix, addData, getData }
}
