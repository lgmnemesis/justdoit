import { useEffect, useState } from 'react'
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
}: {
  date: Date | null
  setDate: (date: Date | null) => void
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    date || new Date(),
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    setDate(selectedDate)
  }, [selectedDate, date, setDate])

  return (
    <>
      {isMobile ? (
        <IonItemWrapper color="primary">
          <IonDatetime
            displayFormat="DD/MM/YYYY"
            placeholder="Select Date"
            value={selectedDate?.toString()}
            onIonChange={(e) => handleDateChange(new Date(e.detail.value!))}
            pickerOptions={{ cssClass: 'ion-date-time-picker-ismobile' }}
          ></IonDatetime>
        </IonItemWrapper>
      ) : (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePickerWrapper
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              label="Select Date"
              value={selectedDate}
              minDate={new Date()}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      )}
    </>
  )
}
