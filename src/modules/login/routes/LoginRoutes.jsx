import { Route } from 'react-router-dom';
//import RouteWrapper from '../../../routes/RouteWrapper';

import LoginPage from '../pages/LoginPage';


const LoginRoutes = () => (
    <Routes>
    {/*<RouteWrapper>*/}
        <Route path="login" element={<LoginPage />} />

    {/* </RouteWrapper>*/}
    </Routes>
);

export default LoginRoutes;
