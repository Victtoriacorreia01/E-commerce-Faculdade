import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Favorite from '../pages/Favorite'; // Importe a página de contato

const FavoritesRoutes = () => (
  <Routes>
    <Route path="/favorite"  element={<Favorite />} />
    {/* Adicione outras rotas filhas aqui, se necessário */}
  </Routes>
);

export default FavoritesRoutes;
