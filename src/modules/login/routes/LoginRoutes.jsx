import { Routes, Route } from 'react-router-dom'; // Importe Routes corretamente
import LoginPage from '../pages/LoginPage';

const LoginRoutes = () => (
    <Routes>
        <Route path="login" element={<LoginPage />} />
    </Routes>
);

export default LoginRoutes;
