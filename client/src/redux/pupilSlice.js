import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { retrievePupilsRequest } from '../requests/PupilRequests';

export const getPupils = createAsyncThunk("pupils/", async () => {
    const res = await retrievePupilsRequest();
    return res.data;
});

export const pupilSlice = createSlice({
    name: "pupils",
    initialState: {
        teachers: [],
        pending: false,
        error: false,
    },
    extraReducers: {
        [getPupils.pending]: (state) =>{
            state.pending = true;
            state.error = false;
        },      
        [getPupils.fulfilled]: (state, action) =>{
            state.pending = false;
            state.pupils = action.payload;
        },
        [getPupils.rejected]: (state) =>{
            state.pending = false;
            state.error = true;
        }
    }
});

export default pupilSlice.reducer;
