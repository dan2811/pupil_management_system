import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOffIcon from '@mui/icons-material/EditOff';
import SaveIcon from '@mui/icons-material/Save';


import {
    createInstrumentRequest,
    retrieveInstrumentsRequest, 
    updateInstrumentRequest,
    deleteInstrumentRequest 
} from '../requests/InstrumentRequests';
import SnackBar from './snackBar';
import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { retrieveCoursesRequest } from '../requests/CourseRequests';


const Wrapper = styled.div`
    display: flex;
    max-width: 100%;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
`;

const Table = styled.table`
    max-width: 80%;
    overflow: scroll;
    margin: 1rem; 
    border-collapse: collapse;
    position: relative;
`;

const Thead = styled.thead`
    
`;

const Th = styled.th`
    border: ${props => props.empty ? 'none' : '1px solid gray'};
`;

const Tbody = styled.tbody`
`;

const Td = styled.td`
    padding: 1rem;
    text-align: center;
    justify-self: center;
    border: ${props => props.edit ? 'none' : '1px solid gray'};
    text-overflow: ellipsis;
    max-height: 20%;
`;

const Tr = styled.tr`
    
`;

const EditButton = styled(EditIcon)`
    border-radius: 100%;
    padding: 0.5rem;
    color: #c29229;
    &:hover{
        background-color: #e4d9c0;
    }
    cursor: pointer;
`;

const EditOffButton = styled(EditOffIcon)`
    border-radius: 100%;
    padding: 0.5rem;
    color: #c29229;
    &:hover{
        background-color: #e4d9c0;
    }
    cursor: pointer;
`;

const SaveButton = styled(SaveIcon)`
    border-radius: 100%;
    padding: 0.5rem;
    color: #4bb331;
    &:hover{
        background-color: #d4f7cb;
    }
    cursor: pointer;
`;

const AddButton = styled(AddCircleOutlineIcon)`
    margin-bottom: 1rem;
    border-radius: 100%;
    padding: 0.5rem;
    &:hover{
        background-color: #d8d8d8;
    }
    cursor: pointer;
`;

const RemoveButton = styled(RemoveCircleOutlineIcon)`
    margin-bottom: 1rem;
    border-radius: 100%;
    padding: 0.5rem;
    &:hover{
        background-color: #d8d8d8;
    }
    cursor: pointer;
`;

const DeleteButton = styled(DeleteIcon)`
    margin-bottom: 1rem;
    border-radius: 100%;
    padding: 0.5rem;
    color: #a51f1f;
    &:hover{
        background-color: #e2bdbd;
    }
    cursor: pointer;
`;

const DoneButton = styled(CheckCircleOutlineIcon)`
    border-radius: 100%;
    padding: 0.5rem;
    &:hover{
        background-color: #d8d8d8;
    }
    cursor: pointer;
`;



const Input = styled.input`
    
`;

const InstrumentTable = () => {
    const [newInstrumentFormDisplay, setNewInstrumentFormDisplay] = useState(false);
    const [newInstrumentCourses, setNewInstrumentCourses] = useState([]);
    const [newInstrumentName, setNewInstrumentName] = useState('');
    const [instruments, setInstruments] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [editRow, setEditRow] = useState(null);
    const [editInstrument, setEditInstrument] = useState(null);
    const [error, setError] = useState('');

    
    const fetchInstrumentsFromDatabase = async () => {
        try {
            const retrievedInstruments = await retrieveInstrumentsRequest();
            if(retrievedInstruments) {
                setInstruments(retrievedInstruments.data);
            };
        } catch (e) {
            setError('Failed to fetch Instruments');
        }
    };

    const fetchCoursesFromDatabase = async () => {
        try {
            const retrievedCourses = await retrieveCoursesRequest();
            if(retrievedCourses) {
                setAllCourses(retrievedCourses.data);
            };
        } catch (e) {
            console.log(e);
        }
    };

    const handleAddNewInstrument = async () => {
        const newInstrument = {
            name: newInstrumentName,
            courses: newInstrumentCourses
        };
        try {
            const result = await createInstrumentRequest(newInstrument);
            if(result) {
                setNewInstrumentFormDisplay(false);
                const newInstruments = [...instruments, newInstrument]
                setInstruments(newInstruments);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const deleteInstrument = async (instrument) => {
        try {
            const result = await deleteInstrumentRequest(instrument);
            if(result.data.deletedCount > 0) {
                const filteredInstruments = instruments.filter((item) => item !== instrument);
                setInstruments(filteredInstruments);
            };
        } catch (e) {
            console.log(e);
        }
    };

    const updateInstrument = async () => {
        try {
            const result = await updateInstrumentRequest(editInstrument);
            if(result) {
                fetchInstrumentsFromDatabase();
                setEditRow(null);
            }
        } catch (e) {
            console.error(e);
        }
    };


    const handleEditInstrumentCourses = (courseId) => {
        const updatedInstrument = {...editInstrument};
        if(updatedInstrument.courses.includes(courseId)) {
            updatedInstrument.courses = updatedInstrument.courses.filter((el) => el !== courseId);
            setEditInstrument(updatedInstrument);
        } else {
            updatedInstrument.courses.push(courseId);
            setEditInstrument(updatedInstrument);
        };
    };

    const handleAddCourseToNewInstrument = (courseId) => {
        let updated = [...newInstrumentCourses];
        if(newInstrumentCourses.includes(courseId)) {
            updated = updated.filter((el) => el !== courseId);
            setNewInstrumentCourses(updated);
        } else {
            updated.push(courseId);
            setNewInstrumentCourses(updated);
        };
    };

        useEffect( () => {
            (async () => {
                 await fetchInstrumentsFromDatabase();
                 await fetchCoursesFromDatabase();
            })
            ();
        },[]);

  return (
    <Wrapper>
        <h1>Instruments</h1>
        <Table>
                    <Thead>
                        <Th empty={true}/>
                        <Th>Instrument Name</Th>
                        <Th>Courses</Th>
                    </Thead>
                    <Tbody>
                        {instruments?.map((instrument, rowIdx) => (
                            <Tr key={`instrument-${rowIdx}`}>
                                <Td edit={true}><DeleteButton onClick={() => deleteInstrument(instrument)}/></Td>
                                <Td>
                                    {
                                    editRow === rowIdx 
                                    ? <Input 
                                        type="text" 
                                        placeholder={instrument.name} 
                                        onChange={(e)=>instrument.name = e.target.value}
                                        /> 
                                    : instrument.name
                                    }
                                </Td>
                                <Td>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {editRow !== rowIdx
                                            ?   instrument.courses?.map((courseId, idx) => (
                                                <ListItem
                                                key={`course-${idx}`}
                                                disablePadding>
                                                    <ListItemText primary={allCourses.find(el => courseId === el._id)?.name} />
                                                </ListItem>
                                            ))
                                            :   allCourses.map((course, idx) => (
                                                <ListItem
                                                key={`course-${idx}`}
                                                disablePadding>
                                                    <ListItemButton onClick={() => handleEditInstrumentCourses(course._id)}>
                                                        <ListItemIcon>
                                                            <Checkbox checked={editInstrument.courses.includes(course._id)} />
                                                        </ListItemIcon>
                                                        <ListItemText primary={course.name} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Td>
                                <Td edit={true}>
                                {editRow === null || editRow !== rowIdx
                                ? 
                                <EditButton onClick={()=>{setEditRow(rowIdx); setEditInstrument(instrument)}}/>
                                : <Wrapper>
                                    <EditOffButton onClick={()=>setEditRow(null)} />
                                    <SaveButton onClick={()=>updateInstrument()} />
                                </Wrapper>
                                }
                                </Td>
                            </Tr>
                        ))}
                      
                        {newInstrumentFormDisplay &&
                           <Tr>
                               <Td edit={true} />
                                <Td>
                                    <Input type={'text'} 
                                    onChange={(e)=>setNewInstrumentName(e.target.value)} />
                                </Td>
                                <Td>
                                    <List>
                                    {allCourses.map((course, idx) => (
                                                <ListItem
                                                key={`course-${idx}`}
                                                disablePadding>
                                                    <ListItemButton onClick={() => handleAddCourseToNewInstrument(course._id)}>
                                                        <ListItemIcon>
                                                            <Checkbox checked={newInstrumentCourses.includes(course._id)} />
                                                        </ListItemIcon>
                                                        <ListItemText primary={course.name} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                    </List>
                                </Td>
                                <Td edit={true}>
                                <DoneButton onClick={handleAddNewInstrument}/>
                                </Td>
                            </Tr>  
                        }
                        
                    </Tbody>
        </Table>
        {newInstrumentFormDisplay ? <RemoveButton onClick={()=>setNewInstrumentFormDisplay(false)}/> : <AddButton onClick={()=>setNewInstrumentFormDisplay(true)}/>}
       
    </Wrapper>
  )
}

export default InstrumentTable