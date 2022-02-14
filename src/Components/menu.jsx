import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from 'react';

const Wrapper = styled.div`
position: relative;
`;

const MenuItems = styled.div`
    height: 90vh;
    width: 40vw;
    background-color: black;
    opacity: 75%;
    position: absolute;
    display: flex;
`;

const StyledLink = styled(Link)`
display: flex;
justify-content: center;
align-items: center;
color: white;
`;


const Menu = () => {
    const [clicked, setClicked] = useState(true);
  return (
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
            <MenuItems>
                <div>
                    Diary
                </div>
                
            </MenuItems> 
        }
       
    </Wrapper>
  )
}

export default Menu