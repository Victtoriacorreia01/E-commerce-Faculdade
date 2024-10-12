import api, { fetcher } from '../../../utils/axiosConfig'; 

export const getProductsByCategory = async () => {
    try {

        const data = await fetcher('/products/of?category=beauty');
        return data; 
    } catch (error) {
        console.error('Erro ao buscar produtos de beleza:', error);
        throw error; 
    }
};
