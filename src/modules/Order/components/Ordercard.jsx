import React from 'react';
import styles from '../styles/Order.module.css'; 

const OrderCard = ({ order }) => {
  return (
    <div className={styles.orderCard}> 
      <div className={styles.orderHeader}>
        <h2 className={styles.orderh2}>Pedido #{order.id}</h2>
        <button className={styles.detailsButton}>Ver Detalhes</button>
      </div>
      <div className={styles.orderDetails}>
        <p>Data: {order.date}</p>
        <p>Status: {order.status}</p>
        <p>Total: {order.total}</p>
      </div>
    </div>
  );
};

export default OrderCard;
