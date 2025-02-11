import { fetcher } from '../../../utils/axiosConfig';

export const getProductsByCategory = async () => {
    try {
        const data = await fetcher('/products/of?category=sport', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return data;
    } catch (error) {
        console.error('Erro ao buscar produtos de esporte:', error);
        throw error;
    }
};
