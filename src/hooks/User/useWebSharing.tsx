import { useCallback } from 'react'
import { SHARE_URL } from '../../constants'

export interface ShareParams {
  url?: string
  title?: string
  text?: string
}

export function useWebSharing() {
  const webShare = useCallback(async (params: ShareParams) => {
    const nav: any = navigator
    try {
      await nav.share({
        url: params.url || SHARE_URL,
        title: params.title,
        text: params.text,
      })
    } catch (error) {
      console.error('Could not share!', error)
    }
  }, [])

  const webChallengeShare = useCallback(async () => {
    const params: ShareParams = {
      url: '',
      title: '',
      text: '',
    }
    return webShare(params)
  }, [webShare])

  return { webShare, webChallengeShare }
}
