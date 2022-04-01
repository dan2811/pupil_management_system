import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { retrieveTeachersRequest, updateTeacherRequest } from '../requests/TeacherRequests';

export const getTeachers = createAsyncThunk("teachers/", async () => {
    const res = await retrieveTeachersRequest();
    return res.data;
});

export const updateTeacher = createAsyncThunk("teachers/update", async (teacher) => {
    const res = await updateTeacherRequest(teacher);
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
            state.updated = action.payload;
        },
        [updateTeacher.rejected]: (state) =>{
            state.pending = false;
            state.error = true;
        }
    }
});

export const { updateStart, updateSuccess, updateError } = teacherSlice.actions;
export default teacherSlice.reducer;
