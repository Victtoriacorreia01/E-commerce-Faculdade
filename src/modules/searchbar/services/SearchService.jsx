import { fetcher } from '../../../utils/axiosConfig';

export const searchProducts = async (query) => {
  try {
    const token = localStorage.getItem('token'); 
    const data = await fetcher(`/products/search?search=${query}`, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
      },
    });
    return data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw new Error('Falha ao buscar produtos.'); 
  }
};
