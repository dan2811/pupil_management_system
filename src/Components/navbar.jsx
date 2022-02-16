import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import MenuIcon from './menuIcon';

const Bar = styled.div` 
  width: 100vw;
  height: 8vh;
  background-color: black;
  display: flex;
  justify-content: space-between;
  z-index: 100;
`;

const Barright = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 2rem;
`;

const Barleft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 2rem;
`;

const Barcenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: white;
  font-weight: 300;
`;


const Navbar = () => {

  const location = useLocation();

  return (
    <div>
      <Bar>
        <Barleft>
          <MenuIcon />
        </Barleft>
        
        <Barcenter>
          <Title>{location.pathname}</Title>
        </Barcenter>

        <Barright>

        </Barright>

      </Bar>
    </div>
  )
}

export default Navbar