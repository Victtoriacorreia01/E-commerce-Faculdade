import axios, { AxiosRequestConfig, AxiosError } from 'axios';

// Cria uma instância do axios com as configurações padrão
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/', // Usa a variável de ambiente ou um valor padrão
    timeout: 15000, // Tempo limite de 15 segundos
    headers: {
        'Content-Type': 'application/json',
    },
});

// Funções auxiliares para facilitar as requisições usando a instância configurada do axios

// Função para GET requests
export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
    try {
        const [url, config] = Array.isArray(args) ? args : [args];
        const response = await axiosInstance.get(url, { ...config });
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
