import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../Components/navbar';
import { Paper } from '@mui/material';
import TeacherTable from '../Components/teacherTable';
import CourseTable from '../Components/courseTable';
import InstrumentTable from '../Components/instrumentTable';

const Wrapper = styled.div`
    
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Box = styled(Paper)`
  margin: 1vw;
  width: fit-content;
`;


const AdminControls = () => {


  return (
    <Wrapper>
        <Navbar />
        <Container>
        <Box elevation={5}>
            <TeacherTable />
        </Box>
        <Box>
          <InstrumentTable />
        </Box>
        <Box elevation={5}>
          <CourseTable />
        </Box>
        </Container>
    </Wrapper>
  )
}

export default AdminControls