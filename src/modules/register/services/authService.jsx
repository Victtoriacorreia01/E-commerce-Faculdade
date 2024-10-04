import { poster } from '../../../utils/axiosConfig';

export const registerUser = async (data) => {

  try {
    const response = await poster('auth/register', data); 

    console.log('Resposta completa da criação do usuário:', response);

    const userId = response?.data?.id || response?.id || response?.user?.id;

    if (!userId) {
      throw new Error('ID do usuário não encontrado na resposta da API.');
    }

    console.log('Usuário registrado com sucesso, ID do usuário:', userId);
    return response;
  } catch (error) {
    console.error('Erro ao registrar o usuário:', error);
    throw error;
  }
};
