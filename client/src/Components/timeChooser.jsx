import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import gbLocale from 'date-fns/locale/en-GB';

const Wrapper = styled.div`

`;

const TimeChooser = ({setTime}) => {

    const [value, setValue] = useState(null);

  return (
    <Wrapper>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={gbLocale}>
            <TimePicker
                minutesStep={30}
                label="Time"
                value={value}
                onChange={(newValue) => {
                setValue(newValue);
                setTime((new Date(newValue).getHours()*60) + (new Date(newValue).getMinutes()));
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    </Wrapper>
  )
}

export default TimeChooser