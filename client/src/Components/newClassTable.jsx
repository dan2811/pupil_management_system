import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { retrieveNewClasses, createNewClass } from '../requests/newClassRequests';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';




const Wrapper = styled.div`

`;

const Table = styled.table`

`;

const Thead = styled.thead`

`;

const Th = styled.th`

`;

const Tbody = styled.tbody`

`;

const Tr = styled.tr`

`;

const Td = styled.td`
    padding: 2rem;
`;

const PlusButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NewClassTable = () => {

    const [allNewClasses, setAllNewClasses] = useState([]);
    const [newClass, setNewClass] = useState({});
    const [edit, setEdit] = useState(null);

    const createNewClass = () => {
        // createNewClass({course: });
    }

    useEffect(() => {
        const main = async () => {
            const result = await retrieveNewClasses();   
            setAllNewClasses(result.data);
        }
        return () => {
            main();
        };
    }, []);

    console.log(allNewClasses);
  return (
    <Wrapper>
        <Table>
            <Thead>
                <Th>Course</Th>
                <Th>Teacher</Th>
                <Th>Day</Th>
                <Th>Time</Th>
                <Th>Pupils</Th>
                <Th>Start Date</Th>
            </Thead>
            <Tbody>
                {allNewClasses?.map((item, idx) => (
                    <Tr>
                        <Td>{item.course}</Td>
                        <Td>{item.teacher}</Td>
                        <Td>{item.day}</Td>
                        <Td>{item.time}</Td>
                        <Td>{item.pupils}</Td>
                        <Td>{item.startDate}</Td>
                    </Tr>
                ))}
                {edit
                ?   <>
                        <Tr>
                            <Td>Course</Td>
                            <Td>teacher</Td>
                            <Td>day</Td>
                            <Td>time</Td>
                            <Td>pupils</Td>
                            <Td>startDate</Td>
                            <Td>
                                <CheckCircleOutlineIcon onClick={createNewClass}/>
                            </Td>
                        </Tr>
                        <Tr>
                            <RemoveCircleOutlineIcon onClick={()=>setEdit(false)} />
                        </Tr>
                    </>
                :   <PlusButton>
                        <AddCircleOutlineIcon onClick={()=>setEdit(true)} />
                    </PlusButton>
                }

            </Tbody>
        </Table>
    </Wrapper>
  )
}

export default NewClassTable