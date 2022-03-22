import React from 'react';
import Navbar from '../Components/navbar';
import { findYamahaMonth } from '../services/currentYamahaMonth';
import styled from 'styled-components';
import { Boop } from '../Animations/boop';

const InfoWrapper = styled.div`
 width: 100vw;
 display: flex;
 flex-wrap: wrap;
 justify-content: center;
 align-items: center;
 margin-top: 10px;
`;

const InfoBox = styled.div`
  border-radius: 10px;
  border: 2px solid black;
  width: 15rem;
  padding: 10px;
  margin: 10px;
  box-shadow: 2px 2px 2px gray;
`;


const Home = () => {
  return (
    <div>
        <Navbar />
        <InfoWrapper>
          <Boop >
          <InfoBox>Current Month: {findYamahaMonth()}</InfoBox>
          </Boop>
          <Boop>
          <InfoBox>Total Students:</InfoBox>
          </Boop>
          <Boop>
          <InfoBox>Total Yamaha Students:</InfoBox>
          </Boop>
          <Boop>
          <InfoBox>Total Non-Yamaha Students:</InfoBox>
          </Boop>
          <Boop>
          <InfoBox>Total Class Students:</InfoBox>
          </Boop>
          <Boop>
          <InfoBox>Total Private Students:</InfoBox>
          </Boop>
        </InfoWrapper>
    </div>
  )
}

export default Home