import api from '@/config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



export interface AuthLoginProps {
    email: string;
    password: string;
}

const AuthLogin = async (data: AuthLoginProps) => {
    const response = await api.post('/auth', data);
    if (response.data?.token) {
        await AsyncStorage.setItem('AUTH_TOKEN_CONDFYNEWS', response.data.token);
    } else {
        throw new Error('Token não encontrado na resposta do servidor');
    }
    
    return response.data;
}


export default AuthLogin;