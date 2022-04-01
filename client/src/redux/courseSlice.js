import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { retrieveCoursesRequest } from '../requests/CourseRequests';

export const getCourses = createAsyncThunk("courses/", async () => {
    const res = await retrieveCoursesRequest();
    return res.data;
});

export const courseSlice = createSlice({
    name: "courses",
    initialState: {
        courses: [],
        pending: false,
        error: false,
    },
    extraReducers: {
        [getCourses.pending]: (state) =>{
            state.pending = true;
            state.error = false;
        },      
        [getCourses.fulfilled]: (state, action) =>{
            state.pending = false;
            state.courses = action.payload;
        },
        [getCourses.rejected]: (state) =>{
            state.pending = false;
            state.error = true;
        }
    }
});

export const { updateStart, updateSuccess, updateError } = courseSlice.actions;
export default courseSlice.reducer;