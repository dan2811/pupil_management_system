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
import { retrieveTeachersRequest } from '../requests/TeacherRequests';
import { retrieveCoursesRequest } from '../requests/CourseRequests';
import DateChooser from './dateChooser';
import { sundayFirstDaysOfWeek } from '../services/businessDetails';
import TimeChooser from './timeChooser';




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

// const Submit = styled(button)`

// `;

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

    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [allTeachers, setAllTeachers] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [Time, setTime] = useState(null);
    const [day, setDay] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [allCourses, setAllCourses] = useState([]);

    useEffect(() => {
        retrieveTeacherData();
        retrieveCourseData();
        setStartDate(new Date());
      }, []);

  return (
    <Wrapper>
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
                        {allTeachers.map((teacher) => (
                            <MenuItem 
                            value={teacher.name}
                            key={teacher}
                            >
                                {teacher.name}
                            </MenuItem>
                        ))}
                    </StyledSelect>

                    <DateChooser setStartDate={setStartDate} />

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
                        {allCourses.map((course) => (
                            <MenuItem 
                            value={course.name}
                            key={course}
                            >
                                {course.name}
                            </MenuItem>
                        ))}
                    </StyledSelect>
                    
                    </Form>

            </StyledAccordionDetails>
        </StyledAccordion>
    </Wrapper>
  )
}

export default CreateNewClass