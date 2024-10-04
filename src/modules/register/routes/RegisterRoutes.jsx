import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage'; 

const RegisterRoutes = () => (
  <Routes>
    <Route path="/register" element={<RegisterPage />} />
   
  </Routes>
);

export default RegisterRoutes;
