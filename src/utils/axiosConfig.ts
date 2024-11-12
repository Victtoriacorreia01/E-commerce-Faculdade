import axios, { AxiosRequestConfig, AxiosError } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/', 
    timeout: 15000, 
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});


export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
    try {
        const [url, config] = Array.isArray(args) ? args : [args];

        // Adicione o token JWT aos cabeçalhos
        const token = localStorage.getItem('authToken'); // Supondo que o token esteja armazenado no localStorage
        const headers = {
            ...config?.headers,
            Authorization: token ? `Bearer ${token}` : undefined,
        };

        const response = await axiosInstance.get(url, { ...config, headers });
        return response.data; // Retorna apenas os dados da resposta
    } catch (error) {
        console.error('Erro no fetcher (GET):', error);
        throw error;
    }
};

// Função para POST requests
export const poster = async (url: string, data: any, config = {}) => {
    try {
        const response = await axiosInstance.post(url, data, config);
        return response.data; // Retorna apenas os dados
    } catch (error) {
        console.error('Erro na requisição POST:', error);
        throw error;
    }
};

// Função para DELETE requests
export const deleter = async (args: string | [string, AxiosRequestConfig]) => {
    try {
        const [url, config] = Array.isArray(args) ? args : [args];
        const response = await axiosInstance.delete(url, { ...config });
        return response.data; // Retorna apenas os dados da resposta
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
        const response = await axiosInstance.put(url, data, { ...baseConfig, ...config });
        return response.data; // Retorna apenas os dados da resposta
    } catch (error) {
        console.error('Erro no putter (PUT):', error);
        throw error;
    }
};

// Exporta a instância do axios para ser usada em outras partes do projeto
export default axiosInstance;
