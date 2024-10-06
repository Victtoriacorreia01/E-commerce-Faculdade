import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CartPage from '../pages/CartPage'; 
import PaymentFirst from '../pages/PaymentFirst';
const CartRoutes = () => (
  <Routes>
    <Route path="/cart" element={<CartPage />} />
    <Route path="/pagamento" element={<PaymentFirst />} />
  </Routes>
);

export default CartRoutes;
