import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NewClassTable from './newClassTable';
import { retrieveTeachersRequest } from '../requests/TeacherRequests';
import { retrieveCoursesRequest } from '../requests/CourseRequests';
import DateChooser from './dateChooser';
import { sundayFirstDaysOfWeek, daysOfWeek } from '../services/businessDetails';
import TimeChooser from './timeChooser';
import SnackBar from './snackBar';
import { Alert, Snackbar, SnackbarContent } from '@mui/material';




const Wrapper = styled.div`

`;

const StyledAccordion = styled(Accordion)`
    width: 50vw;
`;

const StyledAccordionSummary = styled(AccordionSummary)`
    
`;

const StyledSchoolIcon = styled(SchoolIcon)`
    margin-right: 1rem;
`;

const StyledAccordionDetails = styled(AccordionDetails)``;

const ExpandIcon = styled(ExpandMoreIcon)``;

const Form = styled(FormControl)`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
`;

const Label = styled(InputLabel)``;

const StyledSelect = styled(Select)`
    width: 8rem;
`;

const Day = styled(TextField)`
    width: 8rem;
`;

const Submit = styled(Button)`

`;

const CreateNewClass = () => {

    const retrieveTeacherData = async () => {
        const retrievedTeachers = await retrieveTeachersRequest();
        if(retrievedTeachers) {
            setAllTeachers(retrievedTeachers.data);
        };
    };

    const retrieveCourseData = async () => {
        const retrievedCourses = await retrieveCoursesRequest();
        if(retrievedCourses) {
            setAllCourses(retrievedCourses.data);
        }
    }

    const handleCreateNewClass = async () => {
        if(validate()) {
            setError(false);
            const newClass = {
                day,
                time,
                lessonLengthAsMinutes: 60,
                teacher: allTeachers.find(teacher => teacher.name === selectedTeacher),
                pupils: [],
                selectedInstrument,
                type: "Class",
                startDate,
                selectedCourse
            };
    } else {
        console.log("error");
        setError(true);
    }
    }
    
    const setStartDateAndDay = (value) => {
        setStartDate(value);
        setDay(
            sundayFirstDaysOfWeek[new Date(value).getDay()]
        );
    };

    const validate = () => {
        const allState = [selectedTeacher, startDate, day, time, selectedCourse];
        let tracker = true;
        for(let i = 0; i < allState.length; i++) {
            if(!allState[i]) {
                tracker = false;
            };
        };
        return tracker;
    };
    
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [allTeachers, setAllTeachers] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [time, setTime] = useState(null);
    const [day, setDay] = useState('');
    const [selectedInstrument, setSelectedInstrument] = useState('');
    const [allInstruments, setAllInstruments] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [allCourses, setAllCourses] = useState([]);
    const [error, setError] = useState(false);


    useEffect(() => {
        retrieveTeacherData();
        retrieveCourseData();
        setStartDate(new Date());
      }, []);

  return (
    <Wrapper>
        <NewClassTable />
        <StyledAccordion>
            <StyledAccordionSummary expandIcon={<ExpandIcon />}>
                <StyledSchoolIcon />
                <Typography>
                    Create New Class
                </Typography>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
                <Form>
                <Label id="teacher-label">Teacher</Label>
                    <StyledSelect
                    labelId="teacher-label"
                    id="teacher-select"
                    value={selectedTeacher}
                    label="Teacher"
                    onChange={(e)=>setSelectedTeacher(e.target.value)}
                    >
                        {allTeachers.map((teacher, idx) => (
                            <MenuItem 
                            value={teacher.name}
                            key={`${teacher}-${idx}`}
                            >
                                {teacher.name}
                            </MenuItem>
                        ))}
                    </StyledSelect>

                    <DateChooser setStartDateAndDay={setStartDateAndDay} />

                    <Day 
                    margin="normal"
                    label="Day" 
                    type="text" 
                    value={sundayFirstDaysOfWeek[new Date(startDate).getDay()]} 
                    disabled 
                    />

                    <TimeChooser setTime={setTime}/>

                    </Form>
                    <Form>
                    <Label id="course-label">Course</Label>
                    <StyledSelect
                    labelId="course-label"
                    id="course-select"
                    value={selectedCourse}
                    label="Course"
                    onChange={(e)=>setSelectedCourse(e.target.value)}
                    >
                        {allCourses.map((course, idx) => (
                            <MenuItem 
                            value={course.name}
                            key={`${course}-${idx}`}
                            >
                                {course.name}
                            </MenuItem>
                        ))}
                    </StyledSelect>
                    </Form>
                    <Submit 
                    variant='contained' 
                    onClick={handleCreateNewClass}
                    >
                        Create Class
                    </Submit>
                {error && 
                    <Snackbar 
                    open={true}
                    autoHideDuration={3000}
                    onClose={() => setError(false)}
                    >
                        <Alert severity="error" sx={{ width: '100%' }}>
                            Please ensure all fields are complete!
                        </Alert>    
                    </Snackbar>
                }
            </StyledAccordionDetails>
        </StyledAccordion>
        <StyledAccordion>
            <StyledAccordionSummary expandIcon={<ExpandIcon />}>
                <StyledSchoolIcon />
                <Typography>
                    New Classes
                </Typography>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
                Classes here!
            </StyledAccordionDetails>
        </StyledAccordion>
    </Wrapper>
  )
}

export default CreateNewClass