import BlockNumberUpdater from './blockNumberUpdater'
import DarkModeUpdater from './darkModeUpdater'

export default function GlobalStateUpdater() {
  return (
    <>
      <DarkModeUpdater />
      <BlockNumberUpdater />
    </>
  )
}
