import { Routes, Route } from 'react-router-dom';
import BeautyPage from '../pages/BeautyPage';
import ProductPage from '../pages/ProductPage'; 

const BeautyRoutes = () => (
  <Routes>
    <Route path="/page" element={<BeautyPage />} /> 
    <Route path="/produtos/:id" element={<ProductPage />} /> 
  </Routes>
);
export default BeautyRoutes;
const NotFound = () => <h1>Página não encontrada</h1>;