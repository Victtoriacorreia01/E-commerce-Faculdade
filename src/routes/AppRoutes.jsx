import { Routes, Route } from 'react-router-dom';
import HomeRoutes from '../modules/Home/routes/HomeRoutes';
import FemRoutes from '../modules/fem/routes/FemRoutes';
import LoginRoutes from '../modules/login/routes/LoginRoutes';
import ManRoutes from '../modules/man/routes/ManRoutes';
import SportRoutes from '../modules/sport/routes/SportRoutes';
import BeautyRoutes from '../modules/beauty/routes/BeautyRoutes';
import RegisterRoutes from '../modules/register/routes/RegisterRoutes';
import CartRoutes from '../modules/cart/routes/CartRoutes';
import ContactRoutes from '../modules/contact/routes/ContactRoutes'; 

const AppRoutes = () => (
  <Routes>
    {/* Mudando para path="/" */}
    <Route path="/" element={<HomeRoutes />} />
    
    <Route path="/fem/*" element={<FemRoutes />} />
    <Route path="/login/*" element={<LoginRoutes />} />
    <Route path="/man/*" element={<ManRoutes />} />
    <Route path="/sport/*" element={<SportRoutes />} />
    <Route path="/beauty/*" element={<BeautyRoutes />} />
    <Route path="/register/*" element={<RegisterRoutes />} />
    <Route path="/cart/*" element={<CartRoutes />} />
    <Route path="/contact/*" element={<ContactRoutes />} />
  </Routes>
);

export default AppRoutes;
