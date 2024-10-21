
import { fetcher } from '../../../utils/axiosConfig';
export const getProductById = async (id) => {
    try {
        const data = await fetcher(`/products/details/${id}`);
        return data;
    } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
        throw error;
    }
};

