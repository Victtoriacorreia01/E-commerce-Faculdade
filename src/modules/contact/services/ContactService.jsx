import axios from 'axios';

const API_URL = 'http://localhost:8080/contact'; // Altere para a URL correta se necessário

export const sendContactMessage = async (contactData) => {
  try {
    const response = await axios.post(API_URL, contactData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar mensagem de contato:', error);
    throw new Error(error.response?.data?.message || 'Falha ao enviar a mensagem.');
  }
};
