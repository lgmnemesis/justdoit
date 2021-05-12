import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import 'inter-ui'
import { BrowserRouter } from 'react-router-dom'
import App from './pages/App'
import { NetworkContextName } from './constants'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import getLibrary from './utils/getLibrary'
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from './theme'
import { GlobalStateProvider } from './state/global'
import GlobalStateUpdater from './state/global/stateUpdater'
import { firebaseService } from './services/firebaseService'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

firebaseService().init()

function Updaters() {
  return (
    <>
      <GlobalStateUpdater />
    </>
  )
}

ReactDOM.render(
  <StrictMode>
    <FixedGlobalStyle />
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <GlobalStateProvider>
          <Updaters />
          <ThemeProvider>
            <ThemedGlobalStyle />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </GlobalStateProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </StrictMode>,
  document.getElementById('root'),
)
