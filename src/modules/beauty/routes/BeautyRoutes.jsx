// src/routes/BeautyRoutes.js
import { Routes, Route } from 'react-router-dom';
import Beauty from '../pages/BeautyPage';
import ProductPage from '../pages/ProductPage';

const BeautyRoutes = () => (
  <Routes>
    <Route path="/page" element={<Beauty />} />
    <Route path="/details/:id" element={<ProductPage />} />
  </Routes>
);

export default BeautyRoutes;
