import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import Menu from './menu';

const Wrapper = styled.div``;

const Bar = styled.div` 
  width: 100vw;
  height: 8vh;
  background-color: black;
  display: flex;
  justify-content: space-between;
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
`;


const Navbar = () => {

  const location = useLocation();

  return (
    <div>
      <Bar>
        <Barleft>
          <Menu />
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