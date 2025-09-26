import api from '@/config/axios';

export interface Content {
    title: string;
    content: string;
}


const createContent = async (content: Content) => {
    const response = await api.post('/posts', content);
    return response.data;
}


export { createContent };