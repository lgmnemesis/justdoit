import styled from 'styled-components'
import { TYPE } from '../../theme'
import { LightCard } from '../Card'
import HowRow from './HowRow'

const HowContainer = styled.div`
  display: flex;
  justify-content: center;
`

const HowInner = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 20px;
`

const HowCard = styled(LightCard)`
  padding: 0;
`

const HowHeader = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  padding: 20px;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  background: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.nice1};
`

const HowBody = styled.div`
  padding: 20px;
  width: 100%;
`

const HeaderText = styled.div`
  padding: 20px;
  line-height: 1.3;
  color: ${({ theme }) => theme.nice1};
`

const Spacing = styled.div`
  padding: 10px;
`

const howTo = [
  {
    id: 'how-sec-1',
    text: 'First, create a challenge',
    steps: [
      { id: 'how-1', text: 'Enter your goal', detailedText: '' },
      {
        id: 'how-2',
        text: 'Set a deadline for the completion of the goal',
        detailedText: '',
      },
      {
        id: 'how-3',
        text: 'Set the amount of ETH you are willing to stake',
        detailedText: `Put your money where your mouth is. Stake as much as or as little as you want. 
        You will only lose your staking if you fail to complete the challenge`,
        show: true,
      },
    ],
  },
  {
    id: 'how-sec-2',
    text: 'While challenge is in progress',
    steps: [
      {
        id: 'how-1',
        text: 'Invite people to support you',
        detailedText: `Any one can choose to support you on your challenge by staking their own tokens. 
        The more supporters, the more incentives you are to achieve your goal`,
        show: true,
      },
    ],
  },
  {
    id: 'how-sec-3',
    text: 'When challenge ends',
    steps: [
      {
        id: 'how-1',
        text: 'Report on your success or failure',
        detailedText: `You will have up to 2 days to report back on your result. 
        Failing to do so means you lose your staking`,
        show: true,
      },
      {
        id: 'how-2',
        text: 'Supporters votes on your success or failure',
        detailedText: `After your report submission, supporters will have up to 7 days window to look at your 
        report and vote on your success accordingly`,
        show: true,
      },
      {
        id: 'how-3',
        text: 'Collect initial staking and rewards',
        detailedText: `After voting is over, on completing the challenge successfully,
        on top of your initial staking, you'll also receive all supporters contributions 
        and additional JDI tokens as a bonus on your success`,
        show: true,
      },
    ],
  },
  {
    id: 'how-sec-4',
    text: 'Tokenomics',
    steps: [
      {
        id: 'how-1',
        text: 'JDI Tokens',
        detailedText: `JDI Tokens are used as additional incentives, 
        rewarding challengers and supporters for contributing and participating in challenges`,
      },
      {
        id: 'how-2',
        text: 'What happens when completing a challenge successfully?',
        detailedText: `
        Challenger
          - Take back their initial staking.
          - Receive all supporters contributions/staking.
          - Receive JDI tokens as a bonus for their participation.
          
          Supporters
          - Receive JDI tokens as a bonus for their support.
        `,
      },
      {
        id: 'how-3',
        text: 'What happens when failing to complete a challenge?',
        detailedText: `
        Challenger
          - Lose their initial staking.
          - Receive JDI tokens as a bonus for their participation.
          
        Supporters 
          - Take back their initial contributions.
          - Receive JDI tokens as a bonus for their support.
        `,
      },
    ],
  },
]

export default function HowItWorksInDetail() {
  return (
    <>
      <HowContainer>
        <HowInner>
          <HowCard>
            <HowHeader>
              <TYPE.LargeHeader>How it works</TYPE.LargeHeader>
            </HowHeader>
            <HeaderText>
              <p>Ready to finally reach your goals?</p>
              <p>
                By commiting to a challenge and staking your own tokens on your
                success, you acknowledge what it’ll take to accomplish it, and
                leveraging the power of putting money on the line to turn that
                goal into a reality.
              </p>
            </HeaderText>
            <Spacing />

            {howTo.map((section) => {
              return (
                <section key={section.id}>
                  <HowHeader>
                    <TYPE.MediumHeader>{section.text}</TYPE.MediumHeader>
                  </HowHeader>
                  <HowBody>
                    {section.steps.map((step) => {
                      return (
                        <HowRow
                          key={step.id}
                          text={step.text}
                          detailedText={step.detailedText}
                          show={step.show}
                        />
                      )
                    })}
                  </HowBody>
                </section>
              )
            })}
          </HowCard>
        </HowInner>
      </HowContainer>
    </>
  )
}
