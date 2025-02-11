import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CartPage from '../pages/CartPage'; 
import PaymentFirst from '../pages/PaymentFirst';
import AddressPage from '../pages/AdressPage';
const CartRoutes = () => (
  <Routes>
    <Route path="/cart" element={<CartPage />} />
    <Route path="/payment" element={<PaymentFirst />} />
    <Route path="/adress" element={<AddressPage />} />
  </Routes>
);

export default CartRoutes;
