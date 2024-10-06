import { poster } from '../../../utils/axiosConfig'; 

export const loginUser = async (data) => {
    try {
        const response = await poster('auth/login', data);
        console.log('Resposta completa:', response);

        const token = response.token; 

        if (!token) {
            throw new Error('Token não encontrado na resposta da API.');
        }

        console.log('Usuário logado com sucesso, token:', token);
        return token; 
    } catch (error) {
        console.error('Erro ao logar o usuário:', error);
        throw error;
    }
};
