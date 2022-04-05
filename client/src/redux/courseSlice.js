import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createCourseRequest, retrieveCoursesRequest, updateCourseRequest, deleteCourseRequest } from '../requests/CourseRequests';

export const createCourse = createAsyncThunk("courses/create", async (data) => {
    const res = await createCourseRequest(data);
    return res;
});

export const getCourses = createAsyncThunk("courses/", async () => {
    const res = await retrieveCoursesRequest();
    return res.data;
});

export const updateCourses = createAsyncThunk("courses/update", async (data) => {
    const res = await updateCourseRequest(data);
    return res.data;
});

export const deleteCourses = createAsyncThunk("courses/delete", async (data) => {
    const res = await deleteCourseRequest(data);
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
        [createCourse.pending]: (state, action) => {
            state.pending = true;
            state.error = false;
        },      
        [createCourse.fulfilled]: (state, action) => {
            state.pending = false;
            state.courses.push(action.payload.data);
        },
        [createCourse.rejected]: (state) => {
            state.pending = false;
            state.error = true;
        },
        [getCourses.pending]: (state) => {
            state.pending = true;
            state.error = false;
        },      
        [getCourses.fulfilled]: (state, action) => {
            state.pending = false;
            state.courses = action.payload;
        },
        [getCourses.rejected]: (state) => {
            state.pending = false;
            state.error = true;
        },
        [updateCourses.pending]: (state) => {
            state.pending = true;
            state.error = false;
        },      
        [updateCourses.fulfilled]: (state, action) => {
            state.pending = false;
            state.error = false;
            state.courses = state.courses.filter(course => course._id !== action.payload._id);
            state.courses.push(action.payload);
        },
        [updateCourses.rejected]: (state) => {
            state.pending = false;
            state.error = true;
        },
        [deleteCourses.pending]: (state) => {
            state.pending = true;
            state.error = false;
        },      
        [deleteCourses.fulfilled]: (state, action) => {
            state.pending = false;
            state.error = false;
            state.courses = state.courses.filter(course => course._id !== action.payload._id);
        },
        [deleteCourses.rejected]: (state) => {
            state.pending = false;
            state.error = true;
        }
    }
});

export default courseSlice.reducer;