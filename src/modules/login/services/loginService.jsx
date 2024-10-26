import { poster } from '../../../utils/axiosConfig';
export const loginUser = async (data) => {
    try {
        const response = await poster('auth/login', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const token = response.token;

        if (!token) {
            throw new Error('Token não encontrado na resposta da API.');
        }

        localStorage.setItem('authToken', token);
        console.log('Token armazenado no localStorage:', localStorage.getItem('authToken', token));
        
        return token; 
    } catch (error) {
        console.error('Erro ao logar o usuário:', error);
        throw error; 
    }
};
