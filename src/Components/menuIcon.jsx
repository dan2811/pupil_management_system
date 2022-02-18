import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import styled from "styled-components";
import { useState } from 'react';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Menu from './menu';
import { useTransition, animated } from 'react-spring';


const Wrapper = styled.div`
    position: relative;
    display: flex;
`;

const StyledMenuIcon = styled(MenuRoundedIcon)`
    color: white;
    display: flex;
`;

const StyledMenuIconOpen = styled(MenuOpenRoundedIcon)`
    color: white;
    display: flex;
`;


const MenuIcon = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    };

    const transition = useTransition(clicked, {
        from: { y: -350, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        leave: { y: -350, opacity: 0 },
    });

    return (
    <ClickAwayListener onClickAway={() => {setClicked(false)}}>
        <Wrapper>
            { clicked ?
                <StyledMenuIconOpen onClick={handleClick}/>
                :
                <StyledMenuIcon onClick={handleClick}/>
            } 
                {transition((style, item) => 
                    item ? <animated.div style={style}><Menu /></animated.div> : ''
                ) }        
        </Wrapper>
    </ClickAwayListener>
  )
}

export default MenuIcon