import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage'; // Importe a página de registro

const RegisterRoutes = () => (
  <Routes>
    <Route path="/register" element={<RegisterPage />} />
    {/* Adicione outras rotas filhas aqui, se necessário */}
  </Routes>
);

export default RegisterRoutes;
