
import React from 'react';
import { Route } from 'react-router-dom';
import RouteWrapper from '../../../routes/RouteWrapper'; // Wrapper para gerenciar rotas

import HomePage from '../pages/HomePage'; // Página 
import HomeOwner from '../pages/HomeOwner'; // Página 
import HomeCompany from '../pages/HomeCompany'; // Página inicial
import ErrorPage from '../../../Shared/Pages/ErrorPage'; // Página inicial
import NoPermissionPage from '../../../Shared/Pages/NoPermissionPage'; 
import NotFoundPage from '../../../Shared/Pages/NotFoundPage';



const HomeRoutes: React.FC = () => (
    <RouteWrapper>
        <Route path="/" element={<HomePage />} />
        <Route path="/owner" element={<HomeOwner />} />
        <Route path="/Company" element={<HomeCompany />} />
        <Route path="/ErrorPage" element={<ErrorPage />} />
        <Route path="/NoPermissionPage" element={<NoPermissionPage />} />
        <Route path="/NotFoundPage" element={<NotFoundPage />} />

    </RouteWrapper>
);

export default HomeRoutes;
