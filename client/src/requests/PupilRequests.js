import axios from 'axios';

export const retrievePupilsRequest = async () => {
    try {
        const result = await axios.get('http://localhost:5000/pupils');
        return result;
    } catch (e) {
        console.error(e);
    }
}