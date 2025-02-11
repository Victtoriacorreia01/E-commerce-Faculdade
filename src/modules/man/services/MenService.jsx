import { fetcher } from '../../../utils/axiosConfig';

export const getProductsByCategory = async () => {
    try {
        const data = await fetcher('/products/of?category=male_fashion', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return data;
    } catch (error) {
        console.error('Erro ao buscar produtos masculinos:', error);
        throw error;
    }
};
