import api from '@/config/axios';
import { AuthLoginProps } from '@/screens/login/services';



const AuthRegister = async (data: AuthLoginProps) => {
    const response = await api.post('/auth/register', data);
    return response.data;
}


export default AuthRegister;