import styled from 'styled-components'
import { ChevronDown, ChevronUp } from 'react-feather'
import { DetailButton, LightColor, PinkColor } from '../DisplayChallenge/styles'
import { useCallback, useState } from 'react'

const RowContainer = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  width: 100%;
  padding: 10px;
`

const RowContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LineBorder = styled.div`
  width: 100%;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.nice1};
  padding-top: 20px;
  margin-bottom: 30px;
  opacity: 0.3;
`

const TextSection = styled.div`
  padding-top: 10px;
`

const NiceColor = styled.span`
  color: ${({ theme }) => theme.nice1};
`

export default function HowRow({
  text,
  detailedText,
}: {
  text: string
  detailedText: string
}) {
  const [details, setDetails] = useState(false)

  const toggleDetails = useCallback(() => {
    setDetails((current) => !current)
  }, [setDetails])

  return (
    <>
      <RowContainer>
        <RowContent>
          <NiceColor>{text}</NiceColor>
          <LightColor>
            <DetailButton onClick={toggleDetails}>
              {details ? 'Hide' : 'Details'}{' '}
              {details ? <ChevronUp /> : <ChevronDown />}
            </DetailButton>
          </LightColor>
        </RowContent>
        {details && (
          <TextSection>
            <PinkColor>{detailedText}</PinkColor>
          </TextSection>
        )}
      </RowContainer>
      <LineBorder />
    </>
  )
}
