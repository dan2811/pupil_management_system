import React, { useState } from 'react';
import Navbar from '../Components/navbar';
import styled from 'styled-components';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Badge from '@mui/material/Badge';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';



const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 92vh;
  overflow: scroll;
  z-index: -10;
`;

const Table = styled.table`
  border: 2px solid black;
  border-collapse: collapse;
  `;

const Tr = styled.tr`
  border: 2px solid black;
  &:hover{
    background-color: #dddddd;
  }
`;


const TableHeader = styled.th`
  border-bottom: 4px solid black;
`;

const DateHeader = styled.th`
  font-weight: 500;
  border-bottom: 4px solid black;
  text-align: left;
`;

const DateNav = styled.td`
  border-bottom: 4px solid black;
`;

const Data = styled.td`
  text-align: center;
`;

const Attendance = styled.td`
  padding: 0.4rem 0;
`;

const Register = () => {
  const [attendance, setAttendance] = useState(null);
  const handleAttendanceClick = () => {
    switch(attendance) {
      case null: 
        setAttendance('A');
        break;
      case 'A':
        setAttendance('C');
        break;
      case 'C':
        setAttendance("DNA");
        break;
      default:
        setAttendance(null);
    };
  };
  return (
    <div>
        <Navbar />
        <Wrapper>
          <Table>
            <Tr>
              <TableHeader>Time</TableHeader>
              <TableHeader>Teacher</TableHeader>
              <TableHeader>Instrument</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>First Name</TableHeader>
              <TableHeader>Last Name</TableHeader>

              <DateNav><ArrowBackIosNewRoundedIcon /></DateNav>
              <DateHeader>Date 1</DateHeader>
              <DateHeader>Date 2</DateHeader>
              <DateHeader>Date 3</DateHeader>
              <DateHeader>Date 4</DateHeader>
              <DateNav><ArrowForwardIosRoundedIcon /></DateNav>
            </Tr>
            <Tr>
              <Data>time 1</Data>
              <Data>teacher 1</Data>
              <Data>instrument 1</Data>
              <Data>class 1</Data>
              <Data>name 1</Data>
              <Data>lastname 1</Data>
              <Data />

              <Attendance onClick={handleAttendanceClick} >
                <Badge badgeContent={attendance}>
                  {attendance === null && <CheckBoxOutlineBlankOutlinedIcon />}
                  {attendance === 'A' && <CheckBoxOutlinedIcon />}
                  {(attendance === 'C' || attendance === 'DNA') && <IndeterminateCheckBoxOutlinedIcon />}
                </Badge>

              </Attendance>
              <Attendance onClick={handleAttendanceClick} >
                <Badge badgeContent={attendance}>
                  {attendance === null && <CheckBoxOutlineBlankOutlinedIcon />}
                  {attendance === 'A' && <CheckBoxOutlinedIcon />}
                  {(attendance === 'C' || attendance === 'DNA') && <IndeterminateCheckBoxOutlinedIcon />}
                </Badge>

              </Attendance>
              <Attendance onClick={handleAttendanceClick} >
                <Badge badgeContent={attendance}>
                  {attendance === null && <CheckBoxOutlineBlankOutlinedIcon />}
                  {attendance === 'A' && <CheckBoxOutlinedIcon />}
                  {(attendance === 'C' || attendance === 'DNA') && <IndeterminateCheckBoxOutlinedIcon />}
                </Badge>

              </Attendance>
              <Attendance onClick={handleAttendanceClick} >
                <Badge badgeContent={attendance}>
                  {attendance === null && <CheckBoxOutlineBlankOutlinedIcon />}
                  {attendance === 'A' && <CheckBoxOutlinedIcon />}
                  {(attendance === 'C' || attendance === 'DNA') && <IndeterminateCheckBoxOutlinedIcon />}
                </Badge>

              </Attendance>
              <Data />

            </Tr>
          </Table>
        </Wrapper>
    </div>
  )
}

export default Register