import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export function useRouterQueryParams() {
  return new URLSearchParams(useLocation().search)
}

export const useSupportIdQueryParam = () => {
  const query = useRouterQueryParams()
  return useMemo(() => query.get('support_id'), [query])
}
