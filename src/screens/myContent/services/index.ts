import api from '@/config/axios';



const getMyContent = async () => {
    const response = await api.get('/posts/my-posts');
    return response.data;
}


export { getMyContent };