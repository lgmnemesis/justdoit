import { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import InformationBar from '../components/InformationBar'
import Web3ReactManager from '../components/Web3ReactManager'
import HomePage from './Home'
import HelpPage from './Help'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  overflow-x: hidden;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.bg2};
`

const BodyWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 70px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  return (
    <Suspense fallback={null}>
      <AppWrapper>
        <InformationBar />
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper>
          <Web3ReactManager>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/help" component={HelpPage} />
              <Route path="/">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Web3ReactManager>
          <Marginer />
        </BodyWrapper>
      </AppWrapper>
    </Suspense>
  )
}
