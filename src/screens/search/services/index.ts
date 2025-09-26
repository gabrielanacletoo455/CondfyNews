import api from "@/config/axios";



const getSearch = async (query: string) => {
    const response = await api.get(`/posts/search?q=${query}`);
    return response.data;
}

export default getSearch;
