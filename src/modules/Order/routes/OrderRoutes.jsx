import { Routes, Route } from 'react-router-dom'; 
import Order from '../pages/Order';

const OrderRoutes = () => (
    <Routes>
        <Route path="order" element={<Order />} />
    </Routes>
);

export default OrderRoutes;