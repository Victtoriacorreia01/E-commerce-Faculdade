import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CartPage from '../pages/CartPage'; 
import AddressPage from '../pages/AdressPage';
const CartRoutes = () => (
  <Routes>
    <Route path="/cart" element={<CartPage />} />
    <Route path="/address" element={<AddressPage />} />
  </Routes>
);

export default CartRoutes;
