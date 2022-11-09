import axios from 'axios';
import { getConfig } from '../config/apiConfig';

export const getPhotos = async () => {
    try {
        const config = getConfig();

        const response = await axios.get('photos/random', {
            ...config,
            params: {
                count: 12 // call 12 photos
            }
        });
        return response.data;
    } catch (err) {
        throw err.response;
    }
};