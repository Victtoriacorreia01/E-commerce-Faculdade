import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ManPage from '../pages/ManPage'; // Importe a página de produtos masculinos

const ManRoutes = () => (
  <Routes>
    <Route path="/men" element={<ManPage />} />
    {/* Adicione outras rotas filhas aqui, se necessário */}
  </Routes>
);

export default ManRoutes;
