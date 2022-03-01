import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 92vh;
  overflow: scroll;
  z-index: -10;
`;

const Grid = styled.table`
  border: 2px solid black;
  border-collapse: collapse;
`;

const Tr = styled.tr`
  border: 2px solid black;
  &:hover{
    background-color: #dddddd;
  }
`;

const Header = styled.th`
  border-bottom: 4px solid black;
  text-transform: capitalize;
  text-align: left;
`;

const Td = styled.td`
  text-align: left;
  border: 2px solid black;
`

const Table = ({data, headers}) => {
  return (
    <Wrapper>
        <Grid>
            <thead>

                <Tr>
                    {headers.map((header) => (
                        header !== 'attendance' 
                        && <Header key={header} >{header}</Header>
                        ))}
                </Tr>
                
                {data.map((pupil, idx) => (
                  <Tr>
                    {Object.keys(pupil).map((key, idx) => (
                      <Td>
                        {pupil[key]}
                      </Td>
                    ))}
                  </Tr>
                ))}

            </thead>
        </Grid>
    </Wrapper>
  )
}

export default Table