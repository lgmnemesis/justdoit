import BlockNumberUpdater from './blockNumberUpdater'
import ChallengesUpdater from './challengesUpdater'
import OwnerReportResultUpdater from './ownerReportResultUpdater'
import SupportChallengeUpdater from './supportChallengeUpdater'
import DarkModeUpdater from './darkModeUpdater'
import { ETHBalanceUpdater } from './ETHBalanceUpdater'
import TimeInSecondsTickerUpdater from './timeInSecondsTickerUpdater'

export default function GlobalStateUpdater() {
  return (
    <>
      <DarkModeUpdater />
      <BlockNumberUpdater />
      <ETHBalanceUpdater />
      <ChallengesUpdater />
      <OwnerReportResultUpdater />
      <SupportChallengeUpdater />
      <TimeInSecondsTickerUpdater />
    </>
  )
}
