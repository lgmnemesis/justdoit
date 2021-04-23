import BlockNumberUpdater from './blockNumberUpdater'
import ChallengesUpdater from './challengesUpdater'
import SupportChallengeUpdater from './supportChallengeUpdater'
import DarkModeUpdater from './darkModeUpdater'
import { ETHBalanceUpdater } from './ETHBalanceUpdater'

export default function GlobalStateUpdater() {
  return (
    <>
      <DarkModeUpdater />
      <BlockNumberUpdater />
      <ETHBalanceUpdater />
      <ChallengesUpdater />
      <SupportChallengeUpdater />
    </>
  )
}
