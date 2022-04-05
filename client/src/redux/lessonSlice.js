import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { retrieveClassesRequest, updateClassesRequest } from '../requests/ClassRequests';

export const getLessons = createAsyncThunk("lessons/", async () => {
    const res = await retrieveClassesRequest();
    return res.data;
});

export const updateLesson = createAsyncThunk("lessons/update", async (lessonToUpdate) => {
    const res = await updateClassesRequest(lessonToUpdate);
    return res.data;
});

const sortAttendanceDates = (payload) => {
  const sorted = payload.map(lesson => {
    return {...lesson, attendance: [...lesson.attendance].sort(
        (a, b) => {
            const [aDay, aMonth, aYear] = a.date.split("/");
            const [bDay, bMonth, bYear] = b.date.split("/");
            const aDate = new Date(+aYear, aMonth-1, +aDay);
            const bDate = new Date(+bYear, bMonth-1, +bDay);
            if(aDate > bDate) {
            return 1;
            } else {
            return -1;
            }
        }
    )}
  })
    return sorted;
}

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
            state.lessons = sortAttendanceDates(action.payload);
        },
        [getLessons.rejected]: (state) =>{
            state.pending = false;
            state.error = true;
        },
        [updateLesson.pending]: (state) =>{
            state.pending = true;
            state.error = false;
        },      
        [updateLesson.fulfilled]: (state, action) =>{
            state.pending = false;
            state.lessons = state.lessons.filter(lesson => lesson._id !== action.payload._id);
            state.lessons.push(action.payload);
            state.lessons = sortAttendanceDates(state.lessons);
        },
        [updateLesson.rejected]: (state) =>{
            state.pending = false;
            state.error = true;
        }
    }
});

export const { updateStart, updateSuccess, updateError } = lessonSlice.actions;
export default lessonSlice.reducer;
