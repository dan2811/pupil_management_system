import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createInstrumentRequest, retrieveInstrumentsRequest, updateInstrumentRequest, deleteInstrumentRequest } from '../requests/InstrumentRequests';

export const createInstrument = createAsyncThunk("instruments/create", async (data) => {
    const res =  await createInstrumentRequest(data);
    return res.data;
});

export const getInstruments = createAsyncThunk("instruments/", async () => {
    const res = await retrieveInstrumentsRequest();
    return res.data;
});

export const updateInstrument = createAsyncThunk("instruments/update", async (data) => {
    const res =  await updateInstrumentRequest(data);
    return res.data;
});

export const deleteInstrument = createAsyncThunk("instruments/delete", async (data) => {
    const res =  await deleteInstrumentRequest(data);
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
        [createInstrument.pending]: (state, action) => {
            state.pending = true;
            state.error = false;
        },      
        [createInstrument.fulfilled]: (state, action) => {
            state.pending = false;
            state.instruments.push(action.payload);
        },
        [createInstrument.rejected]: (state) => {
            state.pending = false;
            state.error = true;
        },
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
        },
        [updateInstrument.pending]: (state) =>{
            state.pending = true;
            state.error = false;
        },      
        [updateInstrument.fulfilled]: (state, action) =>{
            state.pending = false;
            state.instruments = state.instruments.filter(instr => instr._id !== action.payload._id);
            state.instruments.push(action.payload);
        },
        [updateInstrument.rejected]: (state) =>{
            state.pending = false;
            state.error = true;
        },
        [deleteInstrument.pending]: (state) =>{
            state.pending = true;
            state.error = false;
        },      
        [deleteInstrument.fulfilled]: (state, action) =>{
            state.pending = false;
            state.error = false;
            state.instruments = state.instruments.filter(instr => instr._id !== action.payload._id);
        },
        [deleteInstrument.rejected]: (state) =>{
            state.pending = false;
            state.error = true;
        }
    }
});

export default instrumentSlice.reducer;



