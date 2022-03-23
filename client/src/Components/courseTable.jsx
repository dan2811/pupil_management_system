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
    createCourseRequest,
    retrieveCoursesRequest, 
    updateCourseRequest,
    deleteCourseRequest 
} from '../requests/CourseRequests';
import SnackBar from './snackBar';


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

const CourseTable = () => {
    const [newCourseFormDisplay, setNewCourseFormDisplay] = useState(false);
    const [newCourseDescription, setNewCourseDescription] = useState('');
    const [newCourseName, setNewCourseName] = useState('');
    const [newCourseAges, setNewCourseAges] = useState('');
    const [courses, setCourses] = useState([]);
    const [editRow, setEditRow] = useState(null);
    const [editCourse, setEditCourse] = useState(null);
    const [error, setError] = useState('');

    
    const fetchCoursesFromDatabase = async () => {
        try {
            const retrievedCourses = await retrieveCoursesRequest();
            if(retrievedCourses) {
                setCourses(retrievedCourses.data);
            };
        } catch (e) {
            console.log('HERRRRERE');
            setError('Failed to fetch courses');
        }
    };

    const handleAddNewCourse = async () => {
        const newCourse = {
            name: newCourseName,
            description: newCourseDescription,
            ages: newCourseAges
        };
        try {
            const result = await createCourseRequest(newCourse);
            if(result) {
                setNewCourseFormDisplay(false);
                const newCourses = [...courses, newCourse]
                setCourses(newCourses);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const deleteCourse = async (course) => {
        try {
            const result = await deleteCourseRequest(course);
            if(result.data.deletedCount > 0) {
                const filteredCourses = courses.filter((item) => item !== course);
                setCourses(filteredCourses);
            };
        } catch (e) {
            console.log(e);
        }
    }

    const updateCourse = async () => {
        try {
            const result = await updateCourseRequest(editCourse);
            if(result) {
                fetchCoursesFromDatabase();
                setEditRow(null);
            }
        } catch (e) {
            console.error(e);
        }
    }


    // const handleEditTeacherInstr = (instr, teacher) => {
    //     const updatedTeacher = {...editTeacher, _id: teacher._id};
    //     if(editTeacher.instruments.includes(instr)) {
    //         updatedTeacher.instruments = updatedTeacher.instruments.filter((el) => el !== instr);
    //         setEditTeacher({...updatedTeacher});
    //     } else {
    //         updatedTeacher.instruments = [...updatedTeacher.instruments, instr];
    //         setEditTeacher({...updatedTeacher});
    //     };
    // }

        useEffect( () => {
            (async () => {
                if(!error) await fetchCoursesFromDatabase();
            })
            ();
        },[]);

  return (
    <Wrapper>
        <h1>Courses</h1>
        <Table>
                    <Thead>
                        <Th empty={true}/>
                        <Th>Course Name</Th>
                        <Th>Description</Th>
                        <Th>Age Range</Th>
                    </Thead>
                    <Tbody>
                        {courses?.map((course, rowIdx) => (
                            <Tr key={`course-${rowIdx}`}>
                                <Td edit={true}><DeleteButton onClick={() => deleteCourse(course)}/></Td>
                                <Td>
                                    {
                                    editRow === rowIdx 
                                    ? <Input 
                                        type="text" 
                                        placeholder={course.name} 
                                        onChange={(e)=>course.name = e.target.value}
                                        /> 
                                    : course.name
                                    }
                                </Td>
                                <Td>
                                    {
                                    editRow !== rowIdx
                                        ?   <textarea
                                            value={course.description}
                                            disabled />
                                        :   <textarea 
                                        placeholder={course.description} 
                                        onChange={e => course.description = e.target.value}
                                        /> 
                                    }
                                </Td>
                                <Td>
                                        {editRow !== rowIdx
                                            ?   course.ages
                                            :   <Input
                                                type="text"
                                                placeholder={course.ages} 
                                                onChange={e => course.ages = e.target.value}
                                                />
                                        }
                                </Td>
                                <Td edit={true}>
                                {editRow === null || editRow !== rowIdx
                                ? 
                                <EditButton onClick={()=>{setEditRow(rowIdx); setEditCourse(course)}}/>
                                : <Wrapper>
                                    <EditOffButton onClick={()=>setEditRow(null)} />
                                    <SaveButton onClick={()=>updateCourse()} />
                                </Wrapper>
                                }
                                </Td>
                            </Tr>
                        ))}
                      
                        {newCourseFormDisplay &&
                           <Tr>
                               <Td edit={true} />
                                <Td>
                                    <Input type={'text'} 
                                    onChange={(e)=>setNewCourseName(e.target.value)} />
                                </Td>
                                <Td>
                                    <textarea
                                    onChange={e => setNewCourseDescription(e.target.value)}
                                    />
                                </Td>

                                <Td>
                                    <Input
                                    type="text"
                                    onChange={e => setNewCourseAges(e.target.value)}
                                    />
                                </Td>
                                <Td edit={true}>
                                <DoneButton onClick={handleAddNewCourse}/>
                                </Td>
                            </Tr>  
                        }
                        
                    </Tbody>
        </Table>
        {newCourseFormDisplay ? <RemoveButton onClick={()=>setNewCourseFormDisplay(false)}/> : <AddButton onClick={()=>setNewCourseFormDisplay(true)}/>}
       
    </Wrapper>
  )
}

export default CourseTable