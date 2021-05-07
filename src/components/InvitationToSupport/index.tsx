import { useMemo } from 'react'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { useChallengesByFilter } from '../../hooks/User'
import { useSupportIdQueryParam } from '../../hooks/useRouterQueryParams'
import DisplayChallenge from '../DisplayChallenge'

const InviteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
  `};
`

const InvitationMessage = styled.div`
  width: 360px;
  padding: 20px;
  margin-right: 5px;
  background: ${({ theme }) => theme.primary4};
  color: ${({ theme }) => theme.nice1};
  border-radius: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin-bottom: 5px;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width: 100%;
  `};
`

const ChallengeWrapper = styled.div`
  width: 360px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width: 100%;
  `};
`

export default function InvitationToSupport() {
  const idFromQueryParam = useSupportIdQueryParam()
  const { allChallenges } = useChallengesByFilter()
  const { account } = useActiveWeb3React()

  const challenge = useMemo(() => {
    return idFromQueryParam
      ? allChallenges?.find((c) => c.id === idFromQueryParam)
      : null
  }, [idFromQueryParam, allChallenges])

  if (!challenge) return null
  return (
    <InviteContainer>
      <InvitationMessage>
        You've been invited to help a friend to achieve a personal goal.
        <p>While you're at it, why not create your own challenge</p>
      </InvitationMessage>
      <ChallengeWrapper>
        <DisplayChallenge challenge={challenge} account={account} />
      </ChallengeWrapper>
    </InviteContainer>
  )
}
