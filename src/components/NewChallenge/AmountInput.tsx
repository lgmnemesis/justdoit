import { useEffect, useRef, useState } from 'react'
import {
  AmountInputContainer,
  AmountInputWrapper,
  AmountInputSection,
  AmountInputLabel,
  AmountLabelSection,
  BalanceLabel,
  TokenDisplay,
  SpaceX,
  Button,
  MarginY,
} from './styled'
import EthLogo from '../../assets/images/ethereum-logo.png'
import { useActiveWeb3React } from '../../hooks'
import { useAccountETHBalance } from '../../state/wallet'
import { useWalletModalToggle } from '../../hooks/Application'

enum ButtonTextOptions {
  EnterAmount = 'Set Your Price',
  ConnectWallet = 'Connect to a wallet',
  NotEnoughFunds = 'Insufficient ETH balance',
}

export default function AmountInput({
  isActive,
  amount,
  setAmount,
  setAllIsDone,
}: {
  isActive: boolean
  amount: string
  setAmount: (setAmount: string) => void
  setAllIsDone: (setAllIsDone: boolean) => void
}) {
  const { account } = useActiveWeb3React()
  const { balanceFormatStr } = useAccountETHBalance()
  const { toggleWalletModal } = useWalletModalToggle()
  const amountInputRef: any = useRef(null)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [buttonText, setButtonText] = useState(ButtonTextOptions.EnterAmount)

  const handleAmountInput = (event: any) => {
    const value: string = event.target.value
    if (value.match('^[0-9]*[.,]?[0-9]*$')) {
      setAmount(value)
    }
  }

  const validateAmountInput = (value: string) => {
    const amountFloat = parseFloat(value) || 0
    const balance = parseFloat(balanceFormatStr ?? '') || 0
    if (account && amountFloat >= balance) {
      setButtonText(ButtonTextOptions.NotEnoughFunds)
      setButtonDisabled(true)
    } else if (account) {
      setButtonText(ButtonTextOptions.EnterAmount)
      setButtonDisabled(amountFloat === 0)
    } else {
      setButtonDisabled(false)
      setButtonText(ButtonTextOptions.ConnectWallet)
    }
  }

  const handleButtonClicked = () => {
    if (!account) {
      toggleWalletModal()
    } else {
      setAllIsDone(true)
    }
  }

  useEffect(() => {
    validateAmountInput(amount)
  }, [account, amount, balanceFormatStr])

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        amountInputRef.current.focus()
      }, 500)
    }
  }, [isActive])

  return (
    <>
      <AmountInputContainer>
        <AmountLabelSection>
          <AmountInputLabel>Amount</AmountInputLabel>
          <BalanceLabel>
            {account && balanceFormatStr
              ? `Balance: ${balanceFormatStr}`
              : null}
          </BalanceLabel>
        </AmountLabelSection>
        <AmountInputSection>
          <AmountInputWrapper
            ref={amountInputRef}
            inputMode="decimal"
            title="Token Amount"
            autoComplete="off"
            autoCorrect="off"
            type="text"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder="0.0"
            minLength={1}
            maxLength={79}
            spellCheck={false}
            value={amount}
            onChange={handleAmountInput}
          />
          <TokenDisplay>
            <img src={EthLogo} alt="ETH" />
            <SpaceX />
            <p>ETH</p>
          </TokenDisplay>
        </AmountInputSection>
      </AmountInputContainer>

      <MarginY />
      <Button disabled={buttonDisabled} onClick={handleButtonClicked}>
        {buttonText}
      </Button>
    </>
  )
}
