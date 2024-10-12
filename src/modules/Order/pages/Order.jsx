
import React from 'react';
import OrderCard from '../components/Ordercard';

const order = {
  id: 1,
  date: '2024-10-01',
  status: 'Entregue',
  total: 'R$ 150,00',
};

const Order = () => {
  return (
    <div>
      <OrderCard order={order} /> 
    </div>
  );
};

export default Order;
