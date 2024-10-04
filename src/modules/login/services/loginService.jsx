import { poster } from '../../../utils/axiosConfig'; 

export const loginUser = async (data) => {
    try {
        const response = await poster('auth/login', data);
        console.log('Resposta completa:', response); 

        const userId = response?.data?.id || response?.user?.id; 

        if (!userId) {
            throw new Error('ID do usuário não encontrado na resposta da API.');
        }

        console.log('Usuário logado com sucesso, ID do usuário:', userId);
        return response;
    } catch (error) {
        console.error('Erro ao logar o usuário:', error);
        throw error;
    }
};
