import axios from 'axios';

export const updateAttendanceRequest = async (data) => {
    try {
        const result = await axios.post('http://localhost:5000/update/attendance', data);
        return result;
    } catch (e) {
        return e;
    }
}