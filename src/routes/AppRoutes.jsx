import { Routes, Route } from 'react-router-dom';
import HomeRoutes from '../modules/Home/routes/HomeRoutes';
import FemRoutes from '../modules/fem/routes/FemRoutes';
import LoginRoutes from '../modules/bids/routes/bidsRoute';
import ManRoutes from '../modules/user/routes/UsersRoutes';
import SportRoutes from '../modules/project/routes/ProjectsRoutes';
import BeautyRoutes from '../modules/companies/routes/CompaniesRoutes';
import RegisterRoutes from '../modules/companies/routes/CompaniesRoutes';
import CartRoutes from '../modules/user/routes/UsersRoutes';
import ContactRoutes from '../modules/user/routes/UsersRoutes';
import RouteWrapper from './RouteWrapper'; // Wrapper de rotas para autenticação e permissão

const AppRoutes = () => (
  <Routes>
    <Route path="/*" element={<HomeRoutes />} />

    <Route path="/fem/*" element={<FemRoutes />} />

    <Route path="/login/*" element={<LoginRoutes />} />

    <Route 
      path="/man/*" 
      element={
        <RouteWrapper isProtected={true} requiresPermission={true}>
          <ManRoutes />
        </RouteWrapper>
      } 
    />

    <Route path="/sport/*" element={<SportRoutes />} />

    <Route 
      path="/beauty/*" 
      element={
        <RouteWrapper isProtected={true}>
          <BeautyRoutes />
        </RouteWrapper>
      } 
    />

    <Route path="/register/*" element={<RegisterRoutes />} />

    <Route path="/cart/*" element={<CartRoutes />} />

    <Route path="/contact/*" element={<ContactRoutes />} />
  </Routes>
);

export default AppRoutes;
