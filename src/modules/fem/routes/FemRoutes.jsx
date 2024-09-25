import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import InitialPage from '../pages/InitialPage'; // Ajuste o caminho conforme necessário
import DetailPage from '../pages/DetailPage';   // Ajuste o caminho conforme necessário

const FemRoutes = () => {
  return (
    <Routes>
      {/* Rotas públicas sem proteção */}
      <Route path="/initial" element={<InitialPage />} />
      <Route path="/detail" element={<DetailPage />} />
    </Routes>
  );
};

export default FemRoutes;
