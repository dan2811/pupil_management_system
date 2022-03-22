import axios from 'axios';

export const retrieveTeachersRequest = async () => {
    try {
        const result = await axios.get('http://localhost:5000/teachers');
        return result;
    } catch (e) {
        console.error(e);
    }
}

export const createTeacherRequest = async (data) => {
    try {
        const result = await axios.post('http://localhost:5000/create/teacher', data);
        return result;
    } catch (e) {
        console.error(e);
    }
};

export const deleteTeacherRequest = async (data) => {
    try {
        const result = await axios.delete('http://localhost:5000/delete/teacher', {data});
        return result;
    } catch (e) {
        console.error(e);
    }
};

export const updateTeacherRequest = async (data) => {
    try {
        const result = await axios.post('http://localhost:5000/update/teacher', {data});
        return result;
    } catch (e) {
        console.error(e);
    }
}
