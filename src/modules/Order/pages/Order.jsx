
import React from 'react';
import OrderCard from '../components/Ordercard';

const order = {
  id: 12345,
  date: '2024-10-24',
  status: 'Entregue',
  total: 'R$ 200,00',
  items: [
    { name: 'Camiseta', quantity: 2, price: 'R$ 50,00' },
    { name: 'Calça', quantity: 1, price: 'R$ 100,00' },
  ],
};


const Order = () => {
  return (
    <div>
      <OrderCard order={order} /> 
    </div>
  );
};

export default Order;
