import { Routes, Route } from 'react-router-dom'; 
import Account from '../pages/Account';

const AccountRoutes = () => (
    <Routes>
        <Route path="account" element={<Account />} />
    </Routes>
);

export default AccountRoutes;