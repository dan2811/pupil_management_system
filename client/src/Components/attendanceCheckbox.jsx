import React from 'react';
import styled from 'styled-components';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { updateLesson } from '../redux/lessonSlice';


const Wrapper = styled.div`
    display: flex;
    text-align: start;
    align-items: center;
    width: fit-content;
`;

const CheckboxWrapper = styled.div`
    border: 2px solid black;
    border-radius: 13%;
    min-height: 25px;
    height: 25px;
    min-width: 25px;
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const Notes = styled.div`
    margin-left: 5px;
    max-height: 40px;
    width: 140px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const StyledTextField = styled.textarea`
    height: 25px;
    font-size: 0.8rem;
    max-width: 170px;
    text-overflow: ellipsis;
    height: auto;
    max-height: 10rem;
    resize: none;
    border: none;
    border-radius: 4%;
    &:focus {
        outline: none;
    }
`;

const DoneButton = styled(CheckCircleOutlineIcon)`
    border-radius: 100%;
    padding: 0.2rem;
    margin-left: 0.1rem;
    &:hover{
        background-color: #b5d8b4;
    }
    cursor: pointer;
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

const EditNoteContainer = styled.div`
    display: flex;

`;

const AttendanceCheckbox = ({attended, notes, pupilId, allClasses, date, day, loading, setLoading, lessonId, setAllClasses}) => {
    
    
    const returnCheckboxIcon = () => {
        if(loading) {
            return <CircularProgress />
        };
        let iconToReturn;
        switch(attended) {
            case 'Attended':
                iconToReturn = <DoneIcon />
                break;
            case 'Cancelled':
                iconToReturn = 'C'
                break;
            case 'DNA':
                iconToReturn = <CloseIcon />
                break;
            default:
                iconToReturn = ''
            };
        return iconToReturn;
        };

    const getNextAttendanceStatus = () => {
        const array = ["Attended", "Cancelled", "DNA"];
        const attendedIndex = array.indexOf(attended);
        let newAttendanceIndex;
        if(attendedIndex > 2) {
            newAttendanceIndex = -1;
        } else {
            newAttendanceIndex = attendedIndex+1
        };
        return array[newAttendanceIndex];
    }
    
    const updateClasses = async (id, clickCheckbox) => {
        console.log(id, clickCheckbox, attended);
        const attendanceStatus = clickCheckbox ? getNextAttendanceStatus() : attended;
        const lessonToModify = allClasses.find(lesson => lesson._id === lessonId);
        const dateObjToModify = lessonToModify.attendance.find(d => d.date === date.date);
        const pupilToModify = dateObjToModify.pupils.find(pupil => pupil.pupil_id === id);
        const modifiedPupil = {...pupilToModify, attended: attendanceStatus, notes: editNotes};
        
        const modifiedLesson = {...lessonToModify, attendance: [
            ...lessonToModify.attendance.filter((dat => dat.date !== date.date)), {
                ...dateObjToModify, pupils: [
                    ...dateObjToModify.pupils.filter(pupil => pupil.pupil_id !== id), modifiedPupil
                ]
            }
        ]};
        dispatch(updateLesson(modifiedLesson));
    };

    const dispatch = useDispatch();
    const [editNotes, setEditNotes] = useState('');
    const [updatedNotes, setUpdatedNotes] = useState(notes);

  return (
    <Wrapper>
        <CheckboxWrapper onClick={()=>updateClasses(pupilId, true)}>
            {returnCheckboxIcon()}
        </CheckboxWrapper>
        {date.date}
        <Notes onClick={()=>setEditNotes(true)}>
            {editNotes 
            ?
            <ClickAwayListener onClickAway={()=>setEditNotes(false)}>
                <EditNoteContainer>
                <StyledTextField value={updatedNotes} onChange={(e)=>setUpdatedNotes(e.target.value)}/>
                <DoneButton onClick={()=>updateClasses(pupilId)}/>
                </EditNoteContainer>
            </ClickAwayListener>
            : notes ? notes : <EditButton onClick={()=>setEditNotes(true)}/>}
        </Notes>
    </Wrapper>
  )
}

export default AttendanceCheckbox