import api from "@/config/axios";



const getProfileDetail = async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
}

const getMyPostsByProfileId = async (id: number) => {
    const response = await api.get(`/posts/myposts/${id}`);
    return response.data;
}

const getMyCommentsByProfileId = async (id: number) => {
    const response = await api.get(`posts/my-commented/${id}`);
    return response.data;
}


export { getProfileDetail, getMyPostsByProfileId, getMyCommentsByProfileId };