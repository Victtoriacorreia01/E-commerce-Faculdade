import { fetcher, poster, deleter, putter } from '../../../utils/axiosConfig'; // Importa funções reutilizáveis

const CART_URL = 'cart';

export const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem('authToken');

    console.log("Token recuperado: ", token);

    const response = await poster(`${CART_URL}/add`, {productId : productId}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (response.value == 200){
      console.log(response.message);
    }

    return response;
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    throw error;
  }
};


export const getCart = async () => {
  try {
    const token = localStorage.getItem('authToken');

    const cart = await fetcher(CART_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Carrinho:', cart);

    return cart;
  } catch (error) {
    console.error('Erro ao obter o carrinho:', error);
    throw error;
  }
};


export const removeFromCart = async (productId) => {
  try {
    const response = await deleter(`${CART_URL}/remove/${productId}`);
    console.log('Produto removido:', response);
    return response;
  } catch (error) {
    console.error('Erro ao remover produto:', error);
    throw error;
  }
};


export const decrementQuantity = async (productId) => {
  try {
    const data = { productId };
    const response = await putter(`${CART_URL}/decrement`, data);
    console.log('Quantidade diminuída:', response);
    return response;
  } catch (error) {
    console.error('Erro ao diminuir quantidade:', error);
    throw error;
  }
};


export const clearCart = async () => {
  try {
    const response = await deleter(`${CART_URL}/removeAll`);
    console.log('Carrinho esvaziado:', response);
    return response;
  } catch (error) {
    console.error('Erro ao esvaziar o carrinho:', error);
    throw error;
  }
};
