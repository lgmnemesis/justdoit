import {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react'
import {
  Challenge,
  ClaimedTokens,
  InformationBar,
  OwnerReportResult,
  SupportChallenge,
  SupporterReportResult,
} from '../../constants'

export interface GlobalStateInterface {
  isDarkMode: boolean
  isOpenWalletModal: boolean
  blockNumber: number
  acountETHBalance: number
  acountETHBalanceStr: string
  challenges: Challenge[]
  supportChallenges: SupportChallenge[]
  ownerReportResults: OwnerReportResult[]
  supporterReportResult: SupporterReportResult[]
  informationBar: InformationBar
  timeInSeconds: number
  blockTimestamp: number
  claimedTokens: ClaimedTokens
}

const GlobalStateContext = createContext({
  state: {} as Partial<GlobalStateInterface>,
  setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
})

const GlobalStateProvider = ({
  children,
  value = {} as GlobalStateInterface,
}: {
  children: ReactNode
  value?: Partial<GlobalStateInterface>
}) => {
  const [state, setState] = useState(value)
  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  )
}

const useGlobalState = () => {
  const context = useContext(GlobalStateContext)
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateContext')
  }
  return context
}

export { GlobalStateProvider, useGlobalState }
