import { Routes, Route } from 'react-router-dom'; 
import LoginPage from '../pages/LoginPage';

const LoginRoutes = () => (
    <Routes>
        <Route path="login" element={<LoginPage />} />
    </Routes>
);

export default LoginRoutes;
