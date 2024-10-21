// src/modules/products/routes/ProductRoutes.js
import { Routes, Route } from 'react-router-dom';
import ProductPage from '../pages/ProductPage'; // Importar o componente ProductPage

const ProductRoutes = () => (
  <Routes>
    <Route path="/details/:id" element={<ProductPage />} />
  </Routes>
);

export default ProductRoutes;
