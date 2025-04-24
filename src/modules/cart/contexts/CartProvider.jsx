import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Atualização imediata da quantidade de itens no carrinho
    const cartCount = useMemo(() => {
        return cart.reduce((total, product) => total + (product.quantity || 1), 0);
    }, [cart]);

    const addProductIntoCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((p) => p.id === product.id);
            if (existingProduct) {
                return prevCart.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeProductFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((p) => p.id !== id));
    };

    const productCartIncrement = (id) => {
        setCart((prevCart) =>
            prevCart.map((p) =>
                p.id === id ? { ...p, quantity: p.quantity + 1 } : p
            )
        );
    };

    const productCartDecrement = (id) => {
        setCart((prevCart) =>
            prevCart.map((p) =>
                p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
            )
        );
    };

    return (
        <CartContext.Provider value={{
            cart,
            cartCount, // Aqui o contador de itens está sendo atualizado corretamente
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
