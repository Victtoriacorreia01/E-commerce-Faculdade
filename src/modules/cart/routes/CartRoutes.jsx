import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CartPage from '../pages/CartPage'; // Importe a página de carrinho

const CartRoutes = () => (
  <Routes>
    <Route path="/cart" element={<CartPage />} />
    {/* Adicione outras rotas filhas aqui, se necessário */}
  </Routes>
);

export default CartRoutes;
