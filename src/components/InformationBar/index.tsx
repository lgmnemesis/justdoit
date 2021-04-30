import styled from 'styled-components'
import { X } from 'react-feather'
import Loader from '../Loader'
import { useInformationBar } from '../../hooks/User'
import { useEffect } from 'react'

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 10px;
  right: 10px;
  min-width: 200px;
  max-width: calc(100% - 70px);
  z-index: 100;
  padding: 16px 10px;
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 12px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: 10px;
    bottom: unset;
`};
`
const TextTitle = styled.div<{ isSuccess?: boolean }>`
  padding: 0 10px;
  color: ${({ theme, isSuccess }) =>
    isSuccess ? theme.green1 : theme.yellow2};
`

const CloseButton = styled.div`
  cursor: pointer;
  padding-top: 2px;
`

export default function InformationBar() {
  const { informationBar, setInformationBar } = useInformationBar()

  const handleClose = () => {
    setInformationBar({ message: '', isOpen: false })
  }

  useEffect(() => {
    const timer = informationBar?.closeOnTimeout
    if (timer && timer > 0 && informationBar?.isOpen) {
      setTimeout(() => {
        handleClose()
      }, timer)
    }
  }, [informationBar, handleClose])

  return (
    <>
      {informationBar?.isOpen ? (
        <BarContainer>
          {informationBar?.canClose && (
            <CloseButton onClick={handleClose}>
              <X />
            </CloseButton>
          )}
          <TextTitle isSuccess={informationBar?.isSuccessColor}>
            {informationBar?.message}
          </TextTitle>
          {informationBar?.isSpinning && <Loader />}
        </BarContainer>
      ) : null}
    </>
  )
}
