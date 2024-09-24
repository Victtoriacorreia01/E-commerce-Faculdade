import React from 'react';
import { Route } from 'react-router-dom';
import RouteWrapper from '../../../routes/RouteWrapper';
import DetailPage from '../pages/DetailPage';
import InitialPage from '../pages/InitialPage';

const FemRoutes: React.FC = () => {
    return (
        <><RouteWrapper>
            <Route path="detail" element={<DetailPage />} />
            <Route path="initial" element={<InitialPage />} />
        </RouteWrapper>
        <RouteWrapper isProtected={true} requiresPermission={true}>
        </RouteWrapper></>
    );
};

export default FemRoutes;