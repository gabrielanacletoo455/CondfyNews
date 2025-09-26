import api from '@/config/axios';




const getPosts = async () => {
    const response = await api.get('/posts');
    return response.data;
}


export { getPosts };