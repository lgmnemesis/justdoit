import { useState } from 'react'
import { MoreVertical } from 'react-feather'
import { StyledMenuButton } from '../Button'
import styled from 'styled-components'
import { IonPopover } from '@ionic/react'
import { Home, HelpCircle, GitHub } from 'react-feather'
import { NavLink } from 'react-router-dom'
import { GITHUB_URL } from '../../constants'

const MenuContainer = styled.span`
  background-color: ${({ theme }) => theme.bg3};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
`

const MenuItem = styled(NavLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  outline: none;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

let setShowPopoverRef: React.Dispatch<React.SetStateAction<{
  showPopover: boolean
  event: undefined
}>>

const dismissMenu = () => {
  setShowPopoverRef({ showPopover: false, event: undefined })
}

const openExternalLink = () => {
  try {
    setTimeout(() => {
      window.open(GITHUB_URL)
    }, 0)
  } catch (error) {}
}

const MenuContent = () => {
  return (
    <>
      <MenuContainer>
        <MenuItem id={'menu-home'} to={'/home'} onClick={dismissMenu}>
          <Home size={14} />
          Home
        </MenuItem>
        <MenuItem id={'menu-help'} to={'/help'} onClick={dismissMenu}>
          <HelpCircle size={14} />
          Help
        </MenuItem>
        <MenuItem id={'menu-code'} to={''} onClick={openExternalLink}>
          <GitHub size={14} />
          Code
        </MenuItem>
      </MenuContainer>
    </>
  )
}

export default function Menu() {
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  })
  setShowPopoverRef = setShowPopover

  return (
    <>
      <IonPopover
        animated={false}
        showBackdrop={false}
        cssClass="basic-popover menu-popover"
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() =>
          setShowPopover({ showPopover: false, event: undefined })
        }
      >
        <MenuContent />
      </IonPopover>
      <StyledMenuButton
        onClick={(e: any) => {
          setShowPopover({ showPopover: true, event: e })
        }}
      >
        <MoreVertical size={20} />
      </StyledMenuButton>
    </>
  )
}
