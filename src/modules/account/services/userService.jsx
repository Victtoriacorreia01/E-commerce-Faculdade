// src/modules/minhaConta/services/userService.js
import axios from 'axios';

export const getUserProfile = async () => {
    const token = localStorage.getItem('token'); // Certifique-se de que o token está armazenado corretamente

    if (!token) {
        throw new Error('Usuário não autenticado');
    }

    const response = await axios.get('/api/user/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data; // Retorne os dados do usuário
};
