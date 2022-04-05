import axios from 'axios';

export const retrieveClassesRequest = async () => {
    try {
        const result = await axios.get('http://localhost:8000/lessons');
        return result;
    } catch (e) {
        return e;
    }
};

export const updateClassesRequest = async (data) => {
    try {
        const result = await axios.post('http://localhost:8000/lessons/update', {data});
        return result;
    } catch (e) {
        return e;
    }
};

