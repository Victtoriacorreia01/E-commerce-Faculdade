import axios from 'axios';

const token = localStorage.getItem('authToken');
console.log('Token:', token); 

export const getUserProfile = async () => {
    try {
        const token = localStorage.getItem('authToken');
        console.log('Token obtido para getUserProfile:', token);  

        if (!token) {
            throw new Error('Token de autenticação não encontrado');
        }

        const response = await axios.get('http://localhost:8080/my-account', {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao obter perfil do usuário:', error);
        throw error;  
    }
};

export const updateUserProfile = async (editedUser) => {
    try {
        const token = localStorage.getItem('authToken');
        console.log('Token obtido para updateUserProfile:', token);  
        console.log('Dados do usuário a serem atualizados:', editedUser);  

        if (!token) {
            throw new Error('Token de autenticação não encontrado');
        }

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
        console.error('Erro ao atualizar perfil do usuário:', error);
        throw error;  
    }
};

export const updateUserAddress = async (address) => {
    try {
        const token = localStorage.getItem('authToken');
        console.log('Token obtido para updateUserAddress:', token);  
        console.log('Dados do endereço a serem atualizados:', address);  

        if (!token) {
            throw new Error('Token de autenticação não encontrado');
        }

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
        console.error('Erro ao atualizar endereço do usuário:', error);
        throw error;  
    }
};
