import BlockNumberUpdater from './blockNumberUpdater'
import BlockTimestampUpdater from './blockTimestampUpdater'
import ChallengesUpdater from './challengesUpdater'
import SupportChallengeUpdater from './supportChallengeUpdater'
import OwnerReportResultUpdater from './ownerReportResultUpdater'
import SupporterReportResultUpdater from './supporterReportResultUpdater'
import DarkModeUpdater from './darkModeUpdater'
import { ETHBalanceUpdater } from './ETHBalanceUpdater'
import TimeInSecondsTickerUpdater from './timeInSecondsTickerUpdater'
import ClaimedTokensUpdater from './claimedTokensUpdater'

export default function GlobalStateUpdater() {
  return (
    <>
      <DarkModeUpdater />
      <BlockNumberUpdater />
      <ETHBalanceUpdater />
      <ChallengesUpdater />
      <SupportChallengeUpdater />
      <OwnerReportResultUpdater />
      <SupporterReportResultUpdater />
      <TimeInSecondsTickerUpdater />
      <BlockTimestampUpdater />
      <ClaimedTokensUpdater />
    </>
  )
}
