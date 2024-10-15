import { poster } from '../../../utils/axiosConfig';

export const registerUser = async (data) => {
  try {
    const response = await poster('auth/register', data, {
      headers: {
          'Content-Type': 'application/json'
      }
  }); 

    console.log('Resposta completa da criação do usuário:', response);

    // Verifica se o token está presente na resposta
    const token = response?.token || response?.data?.token;

    if (!token) {
      throw new Error('Falha ao registrar o usuário. Token não encontrado.');
    }

    console.log('Usuário registrado com sucesso. Token recebido:', token);
    return response; // Retorna a resposta completa, incluindo o token
  } catch (error) {
    // Exibe a mensagem de erro detalhada da resposta
    console.error('Erro ao registrar o usuário:', error.response?.data || error.message);
    throw error; // Propaga o erro para tratamento externo
  }
};
