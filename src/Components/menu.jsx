import React from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";


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
`;

const StyledLink = styled(Link)`
    color: white;
    padding: 1rem;
`;    


const Menu = ({styles}) => {

  return (
    <Wrapper>
      <MenuItems style={styles}>
        <StyledLink to="/">
            Home
        </StyledLink>
        <StyledLink to="/diary">
            Diary
        </StyledLink>
        <StyledLink to="/register">
            Register
        </StyledLink> 
      </MenuItems>
    </Wrapper>
  )
}

export default Menu