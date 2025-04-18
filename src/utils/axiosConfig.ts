import axios, { AxiosRequestConfig, AxiosError } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/', 
    timeout: 15000, 
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

const isPublicRoute = (url: string) => {
    const publicRoutes = [
        '/contact/contact',
    ];

    try {
        const path = new URL(url, 'http://localhost:8080').pathname; // garante que mesmo path relativo funcione
        return publicRoutes.some((route) => path.startsWith(route));
    } catch (e) {
        console.warn('URL inválida ao verificar rota pública:', url);
        return false;
    }
};
// Função para GET requests
export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
    try {
        const [url, config] = Array.isArray(args) ? args : [args];

        const token = localStorage.getItem('authToken');
        const headers = {
            ...config?.headers,
            Authorization: !isPublicRoute(url) && token ? `Bearer ${token}` : undefined,
        };

        const response = await axiosInstance.get(url, { ...config, headers });
        return response.data;
    } catch (error) {
        console.error('Erro no fetcher (GET):', error);
        throw error;
    }
};

export const poster = async (url: string, data: any, config = {}) => {
    try {
        const token = localStorage.getItem('authToken');
        const headers = {
            ...config?.headers,
            Authorization: !isPublicRoute(url) && token ? `Bearer ${token}` : undefined,
        };

        console.log('POST URL:', url);
        console.log('isPublicRoute:', isPublicRoute(url));
        console.log('Token:', token);
        console.log('Headers enviados:', headers);

        const response = await axiosInstance.post(url, data, { ...config, headers });
        return response.data;
    } catch (error) {
        console.error('Erro na requisição POST:', error);
        throw error;
    }
};

// Função para DELETE requests
export const deleter = async (args: string | [string, AxiosRequestConfig]) => {
    try {
        const [url, config] = Array.isArray(args) ? args : [args];

        const token = localStorage.getItem('authToken');
        const headers = {
            ...config?.headers,
            Authorization: !isPublicRoute(url) && token ? `Bearer ${token}` : undefined,
        };

        const response = await axiosInstance.delete(url, { ...config, headers });
        return response.data;
    } catch (error) {
        console.error('Erro no deleter (DELETE):', error);
        throw error;
    }
};

// Função para PUT requests
export const putter = async (
    args: string | [string, AxiosRequestConfig],
    data: any,
    config?: AxiosRequestConfig
) => {
    try {
        const [url, baseConfig] = Array.isArray(args) ? args : [args];

        const token = localStorage.getItem('authToken');
        const headers = {
            ...baseConfig?.headers,
            Authorization: !isPublicRoute(url) && token ? `Bearer ${token}` : undefined,
        };

        const response = await axiosInstance.put(url, data, { ...baseConfig, ...config, headers });
        return response.data;
    } catch (error) {
        console.error('Erro no putter (PUT):', error);
        throw error;
    }
};

// Exporta a instância do axios
export default axiosInstance;
