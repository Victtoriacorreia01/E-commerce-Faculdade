import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BeautyPage from '../pages/BeautyPage';

const BeautyRoutes = () => (
  <Routes>
    <Route path="/page" element={<BeautyPage />} />
    {/* Adicione outras rotas filhas aqui, se necessário */}
  </Routes>
);

export default BeautyRoutes;
