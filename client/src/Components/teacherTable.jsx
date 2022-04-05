import React, { useState } from 'react';
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
import { createTeacher, updateTeacher, deleteTeacher } from '../redux/teacherSlice';

import { useDispatch, useSelector } from 'react-redux';

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
    const [newTeacher, setNewTeacher] = useState({
        name: '',
        instruments: [],
        days: []
    });
    const [editRow, setEditRow] = useState(null);
    const [editTeacher, setEditTeacher] = useState(null);

    const reduxTeachers = useSelector((state) => state.teachers.teachers);

    const dispatch = useDispatch();

    const handleAddNewTeacher = async () => {
        try {
            dispatch(createTeacher(newTeacher));
            setNewTeacherFormDisplay(false);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async (teacher) => {
        try {
            dispatch(deleteTeacher(teacher));
        } catch (e) {
            console.log(e);
        }
    }

    const handleUpdate = async () => {
        try {
            dispatch(updateTeacher(editTeacher));
            setEditRow(null);
        } catch (e) {
            console.error(e);
        }
    }


    const handleNewTeacherDay = (day) => {
        if(newTeacher.days.includes(day)) {
            setNewTeacher({...newTeacher, days: newTeacher.days.filter(item => day !== item)});
        } else {
            setNewTeacher({...newTeacher, days: [...newTeacher.days, day]});
        };
    }
    
    const handleNewTeacherInstrument = (instr) => {
        if(newTeacher.instruments.includes(instr)) {
            setNewTeacher({...newTeacher, instruments: newTeacher.instruments.filter(item => instr !== item)});
        } else {
            setNewTeacher({...newTeacher, instruments: [...newTeacher.instruments, instr]});
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

  return (
    <Wrapper>
        <h1>Teachers</h1>
        <Table>
                    <Thead>
                        <tr>
                            <Th empty={true}/>
                            <Th>Name</Th>
                            <Th>Instruments</Th>
                            <Th>Days</Th>
                        </tr>
                    </Thead>
                    <Tbody>
                        {reduxTeachers?.map((teacher, rowIdx) => (
                            <Tr key={`teacher-${rowIdx}`}>
                                <Td edit={true}><DeleteButton onClick={() => handleDelete(teacher)}/></Td>
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
                                    <SaveButton onClick={()=>handleUpdate()}/>
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
                                    onChange={(e)=>setNewTeacher({...newTeacher, name: e.target.value})} />
                                </Td>
                                <Td>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    {instrumentsTaught.map((instr, idx) => (
                                        
                                        <ListItem key={instr} disablePadding >
                                        <ListItemButton onClick={()=>handleNewTeacherInstrument(instr)}>
                                            <ListItemIcon>
                                                <Checkbox 
                                                edge="start"
                                                checked={newTeacher.instruments.includes(instr)}
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
                                                checked={newTeacher.days.includes(day)}
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