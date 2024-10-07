import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import FemalePage from '../pages/FemalePage';

const FemRoutes = () => {
  return (
    <Routes>
      <Route path="/female" element={<FemalePage/>}/>
    </Routes>
  );
};

export default FemRoutes;
