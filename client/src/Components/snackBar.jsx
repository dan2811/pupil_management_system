import React from 'react';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Wrapper = styled.div`

`;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const SnackBar = (severity, message) => {

  return (
    <Wrapper>
            <Alert severity={severity}>
            {message}
            </Alert>
    </Wrapper>
  );
}

export default SnackBar