import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import ClickAwayListener from '@mui/base/ClickAwayListener';

const Wrapper = styled.div`
position: relative;
`;

const moveInFromTop = keyframes`
  from {
    transform: translate(0%, -200%);
  }

  to {
    transform: translate(0%, 0%);
  }
`;



const MenuItems = styled.div`
    font-size: 2rem;
    font-weight: 100;
    padding: 2rem;
    background-color: black;
    opacity: 75%;
    position: absolute;
    display: flex;
    left: 2rem;
    flex-direction: column;
    animation: ${moveInFromTop} 0.5s ease-in-out;
`;

const StyledLink = styled(Link)`
    color: white;
    padding: 1rem;
`;    


const Menu = () => {
    const [clicked, setClicked] = useState(true);

  return (
    <ClickAwayListener onClickAway={() => {setClicked(true)}}>
        <Wrapper>
            { clicked ? 
                <MenuRoundedIcon style={{ color: 'white'}} 
                onClick={() => {setClicked(false)}}/>
                :
                <MenuOpenRoundedIcon style={{ color: 'white'}}
                onClick={() => {setClicked(true)}} />
            }
            { clicked ?
                ""
                :
                <MenuItems clicked={clicked} >
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
            }
        
        </Wrapper>
    </ClickAwayListener>
  )
}

export default Menu