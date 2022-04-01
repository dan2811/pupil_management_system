import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { retrieveClassesRequest } from '../requests/ClassRequests';

export const getLessons = createAsyncThunk("lessons/", async () => {
    const res = await retrieveClassesRequest();
    return res.data;
});

export const lessonSlice = createSlice({
    name: "lessons",
    initialState: {
        lessons: [],
        pending: false,
        error: false,
    },
    extraReducers: {
        [getLessons.pending]: (state) =>{
            state.pending = true;
            state.error = false;
        },      
        [getLessons.fulfilled]: (state, action) =>{
            state.pending = false;
            state.lessons = action.payload;
        },
        [getLessons.rejected]: (state) =>{
            state.pending = false;
            state.error = true;
        }
    }
});

export const { updateStart, updateSuccess, updateError } = lessonSlice.actions;
export default lessonSlice.reducer;
