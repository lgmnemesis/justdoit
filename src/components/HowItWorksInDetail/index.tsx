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
    text: 'First, create a challenge',
    steps: [
      {
        id: 'how-1',
        text: 'Enter your goal',
        detailedText: 'd1',
      },
      {
        id: 'how-2',
        text: 'Set a deadline for the completion of the goal',
        detailedText: 'd2',
      },
      {
        id: 'how-3',
        text: 'Set the amount of ETH you are willing to stake',
        detailedText: '',
      },
    ],
  },
  {
    id: 'how-sec-2',
    text: 'While challenge is in progress',
    steps: [
      {
        id: 'how-1',
        text: '1. Enter your goal',
        detailedText: 'd1',
      },
      {
        id: 'how-2',
        text: '2. Set a deadline for the completion of the goal',
        detailedText: 'd2',
      },
      {
        id: 'how-3',
        text: '3. Set the amount of ETH you are willing to stake',
        detailedText: '',
      },
    ],
  },
  {
    id: 'how-sec-3',
    text: 'When challenge ends',
    steps: [
      {
        id: 'how-1',
        text: '1. Enter your goal',
        detailedText: 'd1',
      },
      {
        id: 'how-2',
        text: '2. Set a deadline for the completion of the goal',
        detailedText: 'd2',
      },
      {
        id: 'how-3',
        text: '3. Set the amount of ETH you are willing to stake',
        detailedText: '',
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
                By commiting to a challenge and staking upon completion of that
                challenge, you acknowledge what it’ll take to accomplish it, and
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
