import { poster } from '../../../utils/axiosConfig';

export const sendContactMessage = async (contactData) => {
  try {
    const token = localStorage.getItem('authToken'); 
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : undefined, 
    };

    const response = await poster('/contact', contactData, { headers });

    if (!response) {
      throw new Error('Falha ao enviar a mensagem. Nenhuma resposta do servidor.');
    }

    return  { success: true, message: "Solicitação enviada com sucesso" };
  } catch (error) {
    console.error('Erro ao enviar a mensagem:', error);
    throw new Error('Erro ao enviar a mensagem.');
  }
};
