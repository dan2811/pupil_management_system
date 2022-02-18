import React from 'react';
import Navbar from '../Components/navbar';
import styled from 'styled-components';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 92vh;
  overflow: scroll;
  z-index: -10;
`;

const Headers = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftHeaders = styled.div`
  display: flex;
  width: 40vw;
  justify-content: space-between;
  align-items: center;
`;

const RightHeaders = styled.div`
  display: flex;
  width: 40vw;
  justify-content: space-between;
  align-items: center;
`;

const DateNavigation = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem;
`;


const DateHeader = styled.div`
  display: flex;

`;

const Row = styled.div`
  display: flex;
  width: 100vw;
  height: 5vh;
  background-color: green;
  border: 2px solid black;
  border-style: none solid solid solid;
`;

const Column = styled.div`
  display: flex;
  width: fit-content;
  height: inherit;
  border-style: none solid none none;
  background-color: blue;
`;

const Register = () => {
  return (
    <div>
        <Navbar />
        <Wrapper>
          <Headers>
            <LeftHeaders>
              <Column>Time</Column>
              <Column>Teacher</Column>
              <Column>Instrument</Column>
              <Column>Type</Column>
              <Column>First Name</Column>
              <Column>Last Name</Column>
            </LeftHeaders>
            <RightHeaders>
              <DateNavigation></DateNavigation>
              <DateHeader>Date</DateHeader>
            </RightHeaders>
          </Headers>
          <Row></Row>
          <Row></Row>
        </Wrapper>
    </div>
  )
}

export default Register