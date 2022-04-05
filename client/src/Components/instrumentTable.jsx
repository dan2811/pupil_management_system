import React, { useState } from 'react';
import styled from 'styled-components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOffIcon from '@mui/icons-material/EditOff';
import SaveIcon from '@mui/icons-material/Save';
import { useSelector, useDispatch } from 'react-redux';
import { createInstrument, updateInstrument, deleteInstrument } from '../redux/instrumentSlice';
import SnackBar from './snackBar';
import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';


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
    const [newInstrument, setNewInstrument] = useState({
                                                        name: '',
                                                        courses: []
                                                    });
    const [editRow, setEditRow] = useState(null);
    const [editInstrument, setEditInstrument] = useState(null);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const allCourses = useSelector((state) => state.courses.courses);
    const reduxInstruments = useSelector((state) => state.instruments.instruments); 

    const handleAddNewInstrument = async () => {
        try {
            dispatch(createInstrument(newInstrument));
            setNewInstrumentFormDisplay(false);
            setNewInstrument({
                name: '',
                courses: []
            });
        } catch (e) {
            console.log(e);
        }
    };

    const update = async () => {
        try {
            dispatch(updateInstrument(editInstrument));
            setEditRow(null);
        } catch (e) {
            console.error(e);
        }
    };

    const deleteInstr = async (instrument) => {
        dispatch(deleteInstrument(instrument));
    };


    const handleEditInstrumentCourses = (courseId) => {
        const updatedInstrument = {...editInstrument};
        if(updatedInstrument.courses.includes(courseId)) {
            updatedInstrument.courses = updatedInstrument.courses.filter((el) => el !== courseId);
            setEditInstrument(updatedInstrument);
        } else {
            updatedInstrument.courses = [...updatedInstrument.courses, courseId];
            setEditInstrument(updatedInstrument);
        };
    };

    const handleAddCourseToNewInstrument = (courseId) => {
        let updated = [...newInstrument.courses];
        if(newInstrument.courses.includes(courseId)) {
            updated = updated.filter((el) => el !== courseId);
            setNewInstrument({...newInstrument, courses: updated});
        } else {
            updated.push(courseId);
            setNewInstrument({...newInstrument, courses: updated});
        };
    };

  return (
    <Wrapper>
        <h1>Instruments</h1>
        <Table>
                    <Thead>
                        <tr>
                            <Th empty={true}/>
                            <Th>Instrument Name</Th>
                            <Th>Courses</Th>
                        </tr>
                    </Thead>
                    <Tbody>
                        {reduxInstruments?.map((instrument, rowIdx) => (
                            <Tr key={`instrument-${rowIdx}`}>
                                <Td edit={true}><DeleteButton onClick={() => deleteInstr(instrument)}/></Td>
                                <Td>
                                    {
                                    editRow === rowIdx 
                                    ? <Input 
                                        type="text" 
                                        value={instrument.name} 
                                        onChange={(e)=>instrument.name = e.target.value}
                                        /> 
                                    : instrument?.name
                                    }
                                </Td>
                                <Td>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {editRow !== rowIdx
                                            ?   instrument?.courses?.map((courseId, idx) => (
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
                                                            <Checkbox checked={editInstrument?.courses.includes(course._id)} />
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
                                    <SaveButton onClick={()=>update()} />
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
                                    onChange={(e)=>setNewInstrument({...newInstrument, name: e.target.value})} />
                                </Td>
                                <Td>
                                    <List>
                                    {allCourses.map((course, idx) => (
                                                <ListItem
                                                key={`course-${idx}`}
                                                disablePadding>
                                                    <ListItemButton onClick={() => handleAddCourseToNewInstrument(course._id)}>
                                                        <ListItemIcon>
                                                            <Checkbox checked={newInstrument.courses.includes(course._id)} />
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