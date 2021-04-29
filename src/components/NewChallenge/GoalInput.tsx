import { useRef, useEffect } from 'react'
import { ButtonPrimary } from '../Button'
import { InputWrapper, MarginY, Label } from './styled'
import { IonInput } from '@ionic/react'

export default function GoalInput({
  isActive,
  text,
  setText,
  onClick,
}: {
  isActive: boolean
  text: string
  setText: (setText: string) => void
  onClick: () => void
}) {
  const ionInputRef: any = useRef(null)

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        ionInputRef.current.setFocus()
      }, 500)
    }
  }, [isActive])

  return (
    <>
      <InputWrapper>
        <Label>Enter your goal</Label>
        <IonInput
          ref={ionInputRef}
          maxlength={30}
          placeholder={'E.g. Finish a 5k'}
          value={text}
          onIonChange={(e) => setText(e.detail.value!)}
        ></IonInput>
      </InputWrapper>
      <MarginY />
      <ButtonPrimary disabled={text.trim().length < 3} onClick={onClick}>
        Let's do it
      </ButtonPrimary>
    </>
  )
}
