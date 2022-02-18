import React from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Boop } from '../Animations/boop';



const Wrapper = styled.div`
    position: relative;
`;

const MenuItems = styled.div`
    font-size: 2rem;
    font-weight: 100;
    padding: 2rem;
    background-color: black;
    display: flex;
    opacity: 75%;
    position: absolute;
    top: 1.7rem;
    left: 2rem;
    flex-direction: column;
    z-index: -2;
    box-shadow: 0px 0px 20px black;

`;

const StyledLink = styled(Link)`
    color: white;
    padding: 1rem;
    text-decoration: none;
    &:hover {
      text-shadow: 0px 0px 20px white;
    }
`;    





const Menu = () => {

  return (
    <Wrapper>
      <MenuItems>
      <StyledLink to="/">
        <Boop 
          rotation={5} 
          timing={150} 
          children={
                'Home'
              } />
      </StyledLink>

      <StyledLink to="/diary">
        <Boop 
          rotation={5} 
          timing={150} 
          children={
                'Diary'
              } />
      </StyledLink>

      <StyledLink to="/register">
        <Boop 
          rotation={5} 
          timing={150} 
          children={
              'Register'
            } />
      </StyledLink>

      </MenuItems>
    </Wrapper>
  )
}

export default Menu