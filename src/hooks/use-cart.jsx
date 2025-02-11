// src/hooks/use-cart.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Inicializa o carrinho a partir do localStorage
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    // Atualiza o localStorage sempre que o carrinho mudar
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Cálculo do total de itens no carrinho
  const totalItems = cart.reduce((total, item) => total + (item.quantidade || 1), 0);

  const addProductIntoCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        // Se o produto já estiver no carrinho, apenas incremente a quantidade
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantidade: (item.quantidade || 1) + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantidade: 1 }]; // Adicione um novo produto com quantidade 1
    });
  };

  const removeProductFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const productCartIncrement = (id) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantidade: (item.quantidade || 1) + 1 } : item
      )
    );
  };

  const productCartDecrement = (id) => {
    setCart((prevCart) =>
      prevCart
        .map(item =>
          item.id === id && item.quantidade > 1
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter(item => item.quantidade > 0) // Remove o item se a quantidade for 0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems, // Disponível no contexto
        addProductIntoCart,
        removeProductFromCart,
        productCartIncrement,
        productCartDecrement,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
export default useCart;
