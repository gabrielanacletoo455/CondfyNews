import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import { triggerLogout } from '@/contexts/authEvents';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para requisições
api.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('AUTH_TOKEN_CONDFYNEWS');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // Sem token: não força logout aqui porque pode haver rotas públicas
        // O fluxo inicial é tratado pelo AuthContext.checkAuth()
      }
    } catch (error) {
      //console.log('Erro ao buscar token:', error);
    }
    return config;
  },
  error => Promise.reject(error),
);

// Interceptor para respostas - TRATAMENTO AUTOMÁTICO DE ERROS
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Tratamento automático de erros
    if (error.response) {
      // Erro com resposta do servidor (4xx, 5xx)
      const { status, data } = error.response;

      switch (status) {
        case 400:
          // console.error(
          //   'Dados inválidos:',
          //   data?.message || 'Requisição inválida',
          // );
          break;
        case 401:
          // console.error(
          //   'Não autorizado:',
          //   data?.message || 'Credenciais inválidas',
          // );
          // Limpar token inválido e disparar logout global
          AsyncStorage.removeItem('AUTH_TOKEN_CONDFYNEWS').finally(() => {
            triggerLogout();
          });
          break;
        case 403:
          // console.error(
          //   'Acesso negado:',
          //   data?.message || 'Você não tem permissão',
          // );
          break;
        case 404:
          // console.error(
          //   'Não encontrado:',
          //   data?.message || 'Recurso não encontrado',
          // );
          break;
        case 500:
          // console.error(
          //   'Erro interno do servidor:',
          //   data?.message || 'Erro no servidor',
          // );
          break;
        default:
          //console.error(`Erro ${status}:`, data?.message || 'Erro desconhecido');
      }
    } else if (error.request) {
      // Erro de rede (sem resposta do servidor)
      //console.error('Erro de rede: Verifique sua conexão com a internet');
    } else {
      // Outros erros
      //console.error('Erro:', error.message);
    }

    return Promise.reject(error);
  },
);

export default api;