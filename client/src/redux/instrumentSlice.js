import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { retrieveInstrumentsRequest } from '../requests/InstrumentRequests';

export const getInstruments = createAsyncThunk("instruments/", async () => {
    const res = await retrieveInstrumentsRequest();
    return res.data;
});

export const instrumentSlice = createSlice({
    name: "instruments",
    initialState: {
        instruments: [],
        pending: false,
        error: false,
    },
    extraReducers: {
        [getInstruments.pending]: (state) =>{
            state.pending = true;
            state.error = false;
        },      
        [getInstruments.fulfilled]: (state, action) =>{
            state.pending = false;
            state.instruments = action.payload;
        },
        [getInstruments.rejected]: (state) =>{
            state.pending = false;
            state.error = true;
        }
    }
});

export const { updateStart, updateSuccess, updateError } = instrumentSlice.actions;
export default instrumentSlice.reducer;