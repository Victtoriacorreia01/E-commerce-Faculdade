import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SportPage from '../pages/SportPage'; // Importe a página de esporte

const SportRoutes = () => (
  <Routes>
    <Route path="/" element={<SportPage />} />
    {/* Adicione outras rotas filhas aqui, se necessário */}
  </Routes>
);

export default SportRoutes;
