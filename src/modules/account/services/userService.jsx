import axios from 'axios';

const getToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('Token de autenticação não encontrado');
    }
    return token;
};

export const getUserProfile = async () => {
    try {
        const token = getToken();
        console.log('Token obtido para getUserProfile:', token);

        const response = await axios.get('http://localhost:8080/my-account', {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao obter perfil do usuário:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateUserProfile = async (editedUser) => {
    try {
        const token = getToken();
        console.log('Token obtido para updateUserProfile:', token);
        console.log('Dados do usuário a serem atualizados:', editedUser);

        const response = await axios.put('http://localhost:8080/my-account', editedUser, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            console.log('Perfil atualizado com sucesso');
        } else {
            throw new Error('Erro ao atualizar perfil');
        }

        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar perfil do usuário:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateUserAddress = async (address) => {
    try {
        const token = getToken();
        console.log('Token obtido para updateUserAddress:', token);
        console.log('Dados do endereço a serem atualizados:', address);

        const response = await axios.put('http://localhost:8080/my-account/address', address, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            console.log('Endereço atualizado com sucesso');
        } else {
            throw new Error('Erro ao atualizar endereço');
        }

        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar endereço do usuário:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const uploadProfileImage = async (file) => {
    try {
        const token = getToken();

        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post('http://localhost:8080/my-account/upload-image', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error.response ? error.response.data : error.message);
        throw error;
    }
};
