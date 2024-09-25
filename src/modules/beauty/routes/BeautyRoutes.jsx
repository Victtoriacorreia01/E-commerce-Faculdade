import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import BeautyPage from '../pages/BeautyPage';

const BeautyRoutes = () => (
  <Routes>
    <Route path="/Beauty" element={<BeautyPage />} />
    {/* Adicione outras rotas filhas aqui, se necessário */}
  </Routes>
);

export default BeautyRoutes;
