import axios from 'axios';

export const createInstrumentRequest = async (data) => {
    try {
        const result = await axios.post('http://localhost:5000/instruments/create', data);
        return result;
    } catch (e) {
        console.error(e);
    }
};

export const retrieveInstrumentsRequest = async () => {
    try {
        const result = await axios.get('http://localhost:5000/instruments');
        return result;
    } catch (e) {
        throw new Error(e);
    }
};

export const updateInstrumentRequest = async (data) => {
    try {
        const result = await axios.post('http://localhost:5000/instruments/update', {data});
        return result;
    } catch (e) {
        console.error(e);
    }
};

export const deleteInstrumentRequest = async (data) => {
    try {
        const result = await axios.delete('http://localhost:5000/instruments/delete', {data});
        return result;
    } catch (e) {
        throw new Error(e);
    }
};
