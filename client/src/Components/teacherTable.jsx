import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOffIcon from '@mui/icons-material/EditOff';
import SaveIcon from '@mui/icons-material/Save';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { daysOfWeek } from '../services/businessDetails';
import { instrumentsTaught } from '../services/businessDetails';


import {
    createTeacherRequest,
    retrieveTeachersRequest, 
    updateTeacherRequest,
    deleteTeacherRequest 
} from '../requests/TeacherRequests';
import { 
    Checkbox, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText 
} from '@mui/material';


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

const TeacherTable = () => {
    const [newTeacherFormDisplay, setNewTeacherFormDisplay] = useState(false);
    const [newTeacherInstruments, setNewTeacherInstruments] = useState([]);
    const [newTeacherName, setNewTeacherName] = useState('');
    const [newTeacherDays, setNewTeacherDays] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [editRow, setEditRow] = useState(null);
    const [editTeacher, setEditTeacher] = useState(null);

    
    const fetchTeachersFromDatabase = async () => {
        const retrievedTeachers = await retrieveTeachersRequest();
            if(retrievedTeachers) {
                setTeachers(retrievedTeachers.data);
            };
    };

    const handleAddNewTeacher = async () => {
        const newTeacher = {
            name: newTeacherName,
            days: newTeacherDays,
            instruments: newTeacherInstruments
        };
        try {
            const result = await createTeacherRequest(newTeacher);
            if(result) {
                setNewTeacherFormDisplay(false);
                fetchTeachersFromDatabase();
            }
            console.log(result.data);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteTeacher = async (teacher) => {
        try {
            const result = await deleteTeacherRequest(teacher);
            if(result.data.deletedCount > 0) {
                const filteredTeachers = teachers.filter((item) => item !== teacher);
                setTeachers(filteredTeachers);
            };
        } catch (e) {
            console.log(e);
        }
    }

    const updateTeacher = async () => {
        try {
            const result = await updateTeacherRequest(editTeacher);
            console.log(result.data);
            fetchTeachersFromDatabase();
            setEditRow(null);
        } catch (e) {
            console.error(e);
        }
    }


    const handleNewTeacherDay = (day) => {
        const updatedDays = [...newTeacherDays, day];
        if(newTeacherDays.includes(day)) {
            setNewTeacherDays(
                newTeacherDays.filter(item => day !== item)
            );
        } else {
            setNewTeacherDays(updatedDays);
        };
    }
    
    const handleNewTeacherInstrument = (instr) => {
        const updatedInstruments = [...newTeacherInstruments, instr];
        if(newTeacherInstruments.includes(instr)) {
            setNewTeacherInstruments(
                newTeacherInstruments.filter(item => instr !== item)
            );
        } else {
            setNewTeacherInstruments(updatedInstruments);
        };
    }

    const handleEditTeacherInstr = (instr, teacher) => {
        const updatedTeacher = {...editTeacher, _id: teacher._id};
        if(editTeacher.instruments.includes(instr)) {
            updatedTeacher.instruments = updatedTeacher.instruments.filter((el) => el !== instr);
            setEditTeacher({...updatedTeacher});
        } else {
            updatedTeacher.instruments = [...updatedTeacher.instruments, instr];
            setEditTeacher({...updatedTeacher});
        };
    }

    const handleEditTeacherDay = (day, teacher) => {
        const updatedTeacher = {...editTeacher, _id: teacher._id};
        if(editTeacher.days.includes(day)) {
            updatedTeacher.days = updatedTeacher.days.filter((el) => el !== day);
            setEditTeacher({...updatedTeacher});
        } else {
            updatedTeacher.days = [...updatedTeacher.days, day];
            setEditTeacher({...updatedTeacher});
        };
    }

        useEffect( () => {
            const main = async () => {
                fetchTeachersFromDatabase();
            }
            return main();
        },[]);

  return (
    <Wrapper>
        <h1>Teachers</h1>
        <Table>
                    <Thead>
                        <Th empty={true}/>
                        <Th>Name</Th>
                        <Th>Instruments</Th>
                        <Th>Days</Th>
                    </Thead>
                    <Tbody>
                        {teachers?.map((teacher, rowIdx) => (
                            <Tr key={`teacher-${rowIdx}`}>
                                <Td edit={true}><DeleteButton onClick={() => deleteTeacher(teacher)}/></Td>
                                <Td>
                                    {editRow === rowIdx 
                                    ? <Input 
                                        type="text" 
                                        placeholder={teacher.name} 
                                        onChange={(e)=>teacher.name = e.target.value}
                                        /> 
                                    : teacher.name}
                                </Td>
                                <Td>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {editRow !== rowIdx
                                            ?   teacher.instruments?.map((instrument, idx) => (
                                                <ListItem 
                                                key={`instrument-${idx}`}
                                                disablePadding>
                                                        <ListItemText primary={instrument} />
                                                </ListItem>
                                                ))
                                            :   instrumentsTaught.map((instrument, idx) => (
                                                    <ListItem 
                                                    key={`instrument-${idx}`}
                                                    disablePadding
                                                    >
                                                        <ListItemButton onClick={()=>handleEditTeacherInstr(instrument, teacher)}>
                                                            <ListItemIcon>
                                                                <Checkbox checked={editTeacher.instruments.includes(instrument)}/>
                                                            </ListItemIcon>
                                                            <ListItemText primary={instrument} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                ))}
                                    </List>
                                </Td>
                                <Td>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {editRow !== rowIdx
                                            ?   teacher.days?.map((day, idx) => (
                                                <ListItem 
                                                key={`day-${idx}`}
                                                disablePadding
                                                >
                                                    <ListItemText primary={day} />
                                                </ListItem>
                                            ))
                                            :   daysOfWeek.map((day, idx) => (
                                                <ListItem
                                                key={`day-${idx}`}
                                                disablePadding
                                                >
                                                <ListItemButton onClick={()=>handleEditTeacherDay(day, teacher)}>
                                                    <ListItemIcon>
                                                        <Checkbox checked={editTeacher.days.includes(day)} />
                                                    </ListItemIcon>
                                                    <ListItemText primary={day} />  
                                                </ListItemButton>
                                                </ListItem>
                                            ))}
                                    </List>
                                </Td>
                                <Td edit={true}>
                                {editRow === null || editRow !== rowIdx
                                ? 
                                <EditButton onClick={()=>{setEditRow(rowIdx); setEditTeacher(teacher)}}/>
                                : <Wrapper>
                                    <EditOffButton onClick={()=>setEditRow(null)}/>
                                    <SaveButton onClick={()=>updateTeacher()}/>
                                </Wrapper>
                                }
                                </Td>
                            </Tr>
                        ))}
                      
                        {newTeacherFormDisplay &&
                           <Tr>
                               <Td edit={true} />
                                <Td>
                                    <Input type={'text'} 
                                    onChange={(e)=>setNewTeacherName(e.target.value)} />
                                </Td>
                                <Td>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    {instrumentsTaught.map((instr, idx) => (
                                        
                                        <ListItem key={instr} disablePadding >
                                        <ListItemButton onClick={()=>handleNewTeacherInstrument(instr)}>
                                            <ListItemIcon>
                                                <Checkbox 
                                                edge="start"
                                                checked={newTeacherInstruments.includes(instr)}
                                                disableRipple/>
                                            </ListItemIcon>
                                            <ListItemText primary={instr}/>
                                        </ListItemButton>
                                    </ListItem>
                                    ))}
                                </List>
                                </Td>

                                <Td>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    {daysOfWeek.map((day, idx) => (
                                        <ListItem key={day} disablePadding >
                                        <ListItemButton onClick={()=>handleNewTeacherDay(day)}>
                                            <ListItemIcon>
                                                <Checkbox 
                                                edge="start"
                                                checked={newTeacherDays.includes(day)}
                                                disableRipple/>
                                            </ListItemIcon>
                                            <ListItemText primary={day}/>
                                        </ListItemButton>
                                    </ListItem>
                                    ))}
                                    </List>
                                </Td>
                                <Td edit={true}>
                                <DoneButton onClick={handleAddNewTeacher}/>
                                </Td>
                            </Tr>  
                        }
                        
                    </Tbody>
        </Table>
        {newTeacherFormDisplay ? <RemoveButton onClick={()=>setNewTeacherFormDisplay(false)}/> : <AddButton onClick={()=>setNewTeacherFormDisplay(true)}/>}
    </Wrapper>
  )
}

export default TeacherTable