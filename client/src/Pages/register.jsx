import React, { useState } from 'react';
import Navbar from '../Components/navbar';
import styled from 'styled-components';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { retrievePupilsRequest } from '../requests/PupilRequests';
import { retrieveClassesRequest } from '../requests/ClassRequests';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { daysOfWeek } from '../services/businessDetails';
import { useEffect } from 'react';
import { retrieveTeachersRequest } from '../requests/TeacherRequests';
import { convertDbTimeToLocal } from '../services/timeOpsForDB';
import AttendanceCheckbox from '../Components/attendanceCheckbox';
import { Snackbar } from '@mui/material';



const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 92vh;
  overflow: scroll;
  z-index: -10;
`;

const Table = styled.table`
  border: 2px solid black;
  border-collapse: collapse;
  position: relative;
  `;

const Tr = styled.tr`
  border: 2px solid black;
  &:hover{
    ${props => !props.header &&
    'background-color: #dddddd;'
  }
};
`;


const TableHeader = styled.th`
  position: sticky;
  top: 0;
  padding-bottom: 1rem;
  padding-top: 0.7rem;
  margin-bottom: 1rem;
`;

const DateHeader = styled.th`
  font-weight: 500;
  text-align: left;
  position: sticky;
  top: 0;
  width: 10vw;
  padding-bottom: 1rem;
  padding-left: 0.4rem;
  padding-top: 0.7rem;
  margin-bottom: 1rem;
  background-color: ${
          props => {
          const [day, month, year] = props.date.split('/');
          const dateToCheck = new Date(year, month-1, day);
          const today = new Date();
          if(dateToCheck < today) return "rgba(255, 0, 0, 30%)";
          if(dateToCheck.toDateString() === today.toDateString()) return "rgba(0, 200, 0, 30%)";
          if(dateToCheck > today) return "rgba(255, 196, 1, 30%)";
          }
        };
`;

const DateNav = styled.td`
  padding: 0rem 1rem;
  display: inline;
  position: relative;
  top: 10px;
  min-height: 4vh;
`;

const Data = styled.td`
  text-align: center;
`;

const TabPanel = styled.div``;

const Attendance = styled.td`
  width: fit-content;
`;


const Register = () => {

  const retrievePupilData = async () => {
    const result = await retrievePupilsRequest();
    setAllPupils(result.data);
  };

  const retrieveLessonData = async () => {
    setLoading(true);
    const result = await retrieveClassesRequest();
    setAllClasses(result.data);
    result.data && setLoading(false);
    result.response?.status > 399 && setError(true); setErrorDetails(result);
  };

  const retrieveTeacherData = async () => {
    const retrievedTeachers = await retrieveTeachersRequest();
        if(retrievedTeachers) {
            setAllTeachers(retrievedTeachers.data);
        };
};

  const handleAttendanceClick = () => {

  }

  
  const [allPupils, setAllPupils] = useState([]);
  const [allClasses, setAllClasses] = useState(null);
  const [allTeachers, setAllTeachers] = useState([]);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');
  
  useEffect(() => {
    retrievePupilData();
    retrieveLessonData();
    retrieveTeacherData();
  }, []);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(allClasses);


  return (
    <div>
        <Navbar />
        <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          {daysOfWeek.map((day, idx) => (
            <Tab label={day} />
          ) )}
        </Tabs>
      </AppBar>
        {
        error
        ? 
        <Snackbar open={error} severity={"error"} message={`${errorDetails}`} />
        :
        <Wrapper>
          <Table>
            <thead>
              <Tr header={true} key={'header-row'}>
                <TableHeader>Time</TableHeader>
                <TableHeader>Teacher</TableHeader>
                <TableHeader>Instrument</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>First Name</TableHeader>
                <TableHeader>Last Name</TableHeader>

                <DateNav><ArrowBackIosNewRoundedIcon /></DateNav>
                {allClasses &&
                allClasses?.filter(lesson => lesson.day === daysOfWeek[value])[0]
                .attendance.map((data, idx) => (
                  <DateHeader key={`date-${idx}`} date={data.date}>
                        {data.date}
                      </DateHeader>
                    )
                    )
                  }
                <DateNav><ArrowForwardIosRoundedIcon /></DateNav>
              </Tr>
            </thead>
            <tbody>

              {allClasses?.map((lesson, classIdx) => (
                lesson.day === daysOfWeek[value] &&
                lesson.pupils.map((pupilId, pupilIdx) => (
                  <Tr key={`pupil-${pupilIdx}`}>
                <Data key={`${pupilIdx}-time`} >{convertDbTimeToLocal(lesson.timeAsMinutesPastMidnight)}</Data>
                <Data key={`${pupilIdx}-teacher`} >{allTeachers.find(x => x._id === lesson.teacher)?.name}</Data>
                <Data key={`${pupilIdx}-instrum`} >{lesson?.instrument}</Data>
                <Data key={`${pupilIdx}-classOrPrivate`} >{lesson?.pupils.length > 1 ? "Class" : "Private"}</Data>
                <Data key={`${pupilIdx}-fName`} >{allPupils.find(x => x._id === pupilId)?.firstName}</Data>
                <Data key={`${pupilIdx}-lName`} >{allPupils.find(x => x._id === pupilId)?.lastName}</Data>
                <Data key={`${pupilIdx}-spacer`}  />
                  {lesson.attendance.map((date, dateIdx) => (
                    <Attendance key={`attendance-date-${dateIdx}`}>
                    <AttendanceCheckbox 
                    key={`attendance-checkbox-${dateIdx}`}
                    attended={date.pupils.filter(student => student.pupil_id === pupilId)[0]?.attended} 
                    notes={date.pupils.filter(student => student.pupil_id === pupilId)[0]?.notes}
                    pupilId={pupilId}
                    handleAttendanceClick={handleAttendanceClick}
                    allClasses={allClasses}
                    date={date}
                    day={daysOfWeek[value]}
                    loading={loading}
                    lessonId={lesson._id}
                    setAllClasses={setAllClasses}
                    />
                </Attendance>
                  ))}
                </Tr>
                ))
              ))}
            </tbody>
          </Table>
        </Wrapper>}
    </div>
  )
}

export default Register