import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../Components/navbar';
import { Paper } from '@mui/material';
import TeacherTable from '../Components/teacherTable';
import CourseTable from '../Components/courseTable';

const Wrapper = styled.div`
    
`;

const Box = styled(Paper)`
  margin: 1vw;
  width: fit-content;
`;


const AdminControls = () => {


  return (
    <Wrapper>
        <Navbar />
        <Box elevation={5}>
            <TeacherTable />
        </Box>
        <Box elevation={5}>
          <CourseTable />
        </Box>
    </Wrapper>
  )
}

export default AdminControls