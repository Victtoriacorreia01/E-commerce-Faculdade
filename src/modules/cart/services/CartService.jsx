// cartService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Defina o URL base do backend
const CART_URL = `${BASE_URL}/cart`;

// Função para adicionar item ao carrinho
export const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.post(`${CART_URL}/add`, { productId }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (response.status === 200) {
      console.log("Item adicionado ao carrinho:", response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar produto ao carrinho:', error);
    throw error;
  }
};

// Função para obter o carrinho
export const getCart = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(CART_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Carrinho recuperado:', response.data);
    return response.data; // Retorna diretamente os dados do carrinho
  } catch (error) {
    console.error('Erro ao obter o carrinho:', error);
    throw error;
  }
};

// Função para obter a contagem de itens no carrinho
export const getCartItemCount = async () => {
  try {
    const cart = await getCart();
    const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
    console.log('Quantidade total de itens no carrinho:', itemCount);
    return itemCount;
  } catch (error) {
    console.error('Erro ao obter a contagem de itens no carrinho:', error);
    throw error;
  }
};


// Função para remover um item do carrinho
export const removeFromCart = async (productId) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.delete(`${CART_URL}/remove/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Produto removido do carrinho:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao remover produto do carrinho:', error);
    throw error;
  }
};

// Função para aumentar a quantidade de um item
export const incrementQuantity = async (productId) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.put(`${CART_URL}/increment`, { productId }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Quantidade aumentada no carrinho:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao aumentar quantidade:', error);
    throw error;
  }
};

// Função para diminuir a quantidade de um item
export const decrementQuantity = async (productId) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.put(`${CART_URL}/decrement`, { productId }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Quantidade diminuída no carrinho:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao diminuir a quantidade do produto:', error);
    throw error;
  }
};

// Função para esvaziar o carrinho
export const clearCart = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.delete(`${CART_URL}/removeAll`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Carrinho esvaziado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao esvaziar o carrinho:', error);
    throw error;
  }
};
