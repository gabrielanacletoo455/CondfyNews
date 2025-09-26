import api from '@/config/axios';
import { ProfileFormData } from '../types';


const getProfile = async () => {
    const response = await api.get('/users/information');
    return response.data;
}

const updateProfile = async (data: ProfileFormData) => {
    const response = await api.patch('/users/edit-profile', data);
    return response.data;
}


export { getProfile, updateProfile };