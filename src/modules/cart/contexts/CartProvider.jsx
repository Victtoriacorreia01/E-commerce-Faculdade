// CartProvider.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addProductIntoCart = (product) => {
        // Lógica para adicionar produto no carrinho
    };

    const removeProductFromCart = (id) => {
        // Lógica para remover produto do carrinho
    };

    const productCartIncrement = (id) => {
        // Lógica para incrementar quantidade do produto
    };

    const productCartDecrement = (id) => {
        // Lógica para decrementar quantidade do produto
    };

    return (
        <CartContext.Provider value={{
            cart,
            addProductIntoCart,
            removeProductFromCart,
            productCartIncrement,
            productCartDecrement,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
