import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import gbLocale from 'date-fns/locale/en-GB';




const Wrapper = styled.div`

`;

const DateChooser = ({setStartDateAndDay}) => {

    const [value, setValue] = useState(null);

  return (
    <Wrapper>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={gbLocale}>
            <DatePicker
                label="Start Date"
                value={value}
                onChange={(newValue) => {
                setValue(newValue);
                setStartDateAndDay(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    </Wrapper>
  )
}

export default DateChooser