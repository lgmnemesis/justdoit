import { isMobile } from 'react-device-detect'
import { IonItem, IonDatetime } from '@ionic/react'
import 'date-fns'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import styled from 'styled-components'
import { useCallback } from 'react'

export const GridWrapper = styled(Grid)`
  height: 100px;
`

export const IonItemWrapper = styled(IonItem)`
  --color: ${({ theme }) => theme.text1};
  display: grid;
  justify-content: center;
`
export const KeyboardDatePickerWrapper = styled(KeyboardDatePicker)`
  & label,
  & div,
  & button {
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: 20px;
    font-weight: ${({ theme }) => theme.fontSize1};
    color: ${({ theme }) => theme.text1};
  }
`

export default function DateTimePicker({
  date,
  setDate,
  minDate,
}: {
  date: Date | null
  setDate: (date: Date | null) => void
  minDate: Date | null
}) {
  const handleDateChange = useCallback(
    (selectedDate: Date | null) => {
      setDate(selectedDate)
    },
    [setDate],
  )

  return (
    <>
      {isMobile ? (
        <IonItemWrapper color="primary">
          <IonDatetime
            displayFormat="DD/MM/YYYY"
            placeholder="Select Date"
            value={date?.toString()}
            onIonChange={(e) => handleDateChange(new Date(e.detail.value!))}
            pickerOptions={{ cssClass: 'ion-date-time-picker-ismobile' }}
          ></IonDatetime>
        </IonItemWrapper>
      ) : (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <GridWrapper container justify="space-around">
            <KeyboardDatePickerWrapper
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              label="Select Date"
              value={date}
              minDate={minDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </GridWrapper>
        </MuiPickersUtilsProvider>
      )}
    </>
  )
}
