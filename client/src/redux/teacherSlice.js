import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createTeacherRequest, retrieveTeachersRequest, updateTeacherRequest, deleteTeacherRequest } from '../requests/TeacherRequests';

export const createTeacher = createAsyncThunk("teachers/create", async teacher => {
    const res = await createTeacherRequest(teacher);
    return res.data;
});

export const getTeachers = createAsyncThunk("teachers/", async () => {
    const res = await retrieveTeachersRequest();
    return res.data;
});

export const updateTeacher = createAsyncThunk("teachers/update", async teacher => {
    const res = await updateTeacherRequest(teacher);
    return res.data;
})
export const deleteTeacher = createAsyncThunk("teachers/delete", async teacher => {
    const res = await deleteTeacherRequest(teacher);
    return res.data;
})

export const teacherSlice = createSlice({
    name: "teachers",
    initialState: {
        teachers: [],
        pending: false,
        error: false,
    },
    extraReducers: {
        [createTeacher.pending]: (state) =>{
            state.pending = true;
            state.error = false;
        },      
        [createTeacher.fulfilled]: (state, action) =>{
            state.pending = false;
            state.teachers.push(action.payload);
        },
        [createTeacher.rejected]: (state) =>{
            state.pending = false;
            state.error = true;
        },
        [getTeachers.pending]: (state) =>{
            state.pending = true;
            state.error = false;
        },      
        [getTeachers.fulfilled]: (state, action) =>{
            state.pending = false;
            state.teachers = action.payload;
        },
        [getTeachers.rejected]: (state) =>{
            state.pending = false;
            state.error = true;
        },
        [updateTeacher.pending]: (state) =>{
            state.pending = true;
            state.error = false;
        },      
        [updateTeacher.fulfilled]: (state, action) =>{
            state.pending = false;
            state.teachers = state.teachers.filter(teacher => teacher._id !== action.payload._id);
            state.teachers.push(action.payload);
        },
        [updateTeacher.rejected]: (state) =>{
            state.pending = false;
            state.error = true;
        },
        [deleteTeacher.pending]: (state) =>{
            state.pending = true;
            state.error = false;
        },      
        [deleteTeacher.fulfilled]: (state, action) =>{
            state.pending = false;
            state.teachers = state.teachers.filter(teacher => teacher._id !== action.payload._id);
        },
        [deleteTeacher.rejected]: (state) =>{
            state.pending = false;
            state.error = true;
        }
    }
});

export const { updateStart, updateSuccess, updateError } = teacherSlice.actions;
export default teacherSlice.reducer;
