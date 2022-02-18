import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import MenuIcon from './menuIcon';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

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
  text-transform: capitalize;
`;

const LoginButton = styled.button`
  background-color: white;
  font-weight: 200;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5%;
  padding: 0.5rem;
  &:hover {
    transform: scale(1.1, 1.1);
    box-shadow: 0px 0px 20px white;
    cursor: pointer;
  };
`;

const Account = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: white;
  padding: 0.2rem;
  border-radius: 50%;
  &:hover {
    transform: scale(1.1, 1.1);
    box-shadow: 0px 0px 20px white;
    cursor: pointer;
  };
`;


const Navbar = () => {

  const location = useLocation();

  const user = true;

  return (
    <div>
      <Bar>
        <Barleft>
          <MenuIcon />
        </Barleft>
        
        <Barcenter>
          <Title>{location.pathname === '/' ? 'Home' : location.pathname.split('/')[1]}</Title>
        </Barcenter>

        <Barright>
          {user ? <Account><AccountCircleRoundedIcon/></Account> : <LoginButton>Login</LoginButton>}
        </Barright>

      </Bar>
    </div>
  )
}

export default Navbar