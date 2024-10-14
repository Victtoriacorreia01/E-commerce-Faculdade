import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Favorite from '../pages/Favorite';

const FavoritesRoutes = () => (
  <Routes>
    <Route path="/favorite"  element={<Favorite />} />
  
  </Routes>
);

export default FavoritesRoutes;
