import axios from 'axios';


export const getFavorites = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('Token de autenticação não encontrado');
        throw new Error('Token de autenticação não encontrado');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios.get('http://localhost:8080/wishlist', config);
        return response.data; 
    } catch (error) {
        console.error('Erro ao buscar favoritos:', error.response ? error.response.data : error.message);
        throw error; 
    }
};

export const addToFavorites = async (produtoId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('Token não encontrado.');
        throw new Error('Token não encontrado.');
    }

    try {
        const response = await axios.post(`http://localhost:8080/wishlist`, { produtoId }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar aos favoritos:', error);
        throw error;
    }
};

export const removeFromFavorites = async (itemId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('Token de autenticação não encontrado');
        throw new Error('Token de autenticação não encontrado');
    }

    try {
        const response = await axios.delete('http://localhost:8080/wishlist/remove', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                wishItemId: itemId
            }
        });
        console.log('Item removido da lista de desejos:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Erro ao remover da wishlist:', error.response ? error.response.data : error.message);
        throw error;
    }
};
