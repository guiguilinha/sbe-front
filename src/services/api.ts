import axios, {
  AxiosHeaders,
  type InternalAxiosRequestConfig,
  type RawAxiosRequestHeaders,
} from "axios";
import { fixDirectusImageUrl } from '../utils';



// Dinamicamente define a baseURL com base no ambiente
const getApiBaseUrl = () => {
  // Em produção e desenvolvimento, usa URL relativa (o proxy cuida do roteamento)
  return '/api';
};

// Função para corrigir URLs de imagens em produção (mantida para compatibilidade)
export const fixImageUrl = fixDirectusImageUrl;

// Cliente axios base para o backend
const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para obter o token do usuário autenticado
let tokenGetter: (() => Promise<string | undefined>) | null = null;
export function bindAuthTokenGetter(getter: () => Promise<string | undefined>) {
  tokenGetter = getter;
}

// Interceptor para debug
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = tokenGetter ? await tokenGetter() : undefined;
    
    if (config.url?.includes('/dashboard')) {
      console.log('📊 [API Interceptor] Requisição para dashboard:', {
        url: config.url,
        method: config.method,
        baseURL: config.baseURL,
        hasToken: !!token,
        tokenLength: token?.length || 0
      });
    }
    
    if (token) {
      config.headers = new AxiosHeaders();
    }

    if (config.headers instanceof AxiosHeaders) {
      config.headers.set('Authorization', `Bearer ${token}`);
    } else {
      (config.headers as RawAxiosRequestHeaders)["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.config?.url, error.message);
    return Promise.reject(error);
  }
);

// Tipos base para respostas do backend
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
}

export default api; 