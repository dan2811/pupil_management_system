import axios from 'axios';

export const retrieveClassesRequest = async () => {
    try {
        const result = await axios.get('http://localhost:5000/lessons');
        return result;
    } catch (e) {
        return e;
    }
}