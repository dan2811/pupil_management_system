import axios from 'axios';

export const createNewClass = async (data) => {
    try {
        const result = await axios.post('http://localhost:5000/newclasses/create', data);
        return result;
    } catch (e) {
        console.error(e);
    }
};

export const retrieveNewClasses = async () => {
    try {
        const result = await axios.get('http://localhost:5000/newclasses');
        return result;
    } catch (e) {
        return e;
    }
}