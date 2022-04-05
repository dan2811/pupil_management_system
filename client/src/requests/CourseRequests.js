import axios from 'axios';

export const createCourseRequest = async (data) => {
    try {
        const result = await axios.post('http://localhost:8000/courses/create', data);
        return result;
    } catch (e) {
        console.error(e);
    }
};

export const retrieveCoursesRequest = async () => {
    try {
        const result = await axios.get('http://localhost:8000/courses');
        return result;
    } catch (e) {
        throw new Error(e);
    }
};

export const updateCourseRequest = async (data) => {
    try {
        const result = await axios.post('http://localhost:8000/courses/update', {data});
        return result;
    } catch (e) {
        console.error(e);
    }
};

export const deleteCourseRequest = async (data) => {
    try {
        const result = await axios.delete('http://localhost:8000/courses/delete', {data});
        return result;
    } catch (e) {
        throw new Error(e);
    }
};

