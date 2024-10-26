import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import styles from '../styles/Order.module.css'; 

const OrderCard = ({ order }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className={styles.orderCard}>
        <div className={styles.orderHeader}>
          <h2 className={styles.orderh2}>Pedido #{order.id}</h2>
          <button className={styles.detailsButton} onClick={handleOpen}>
            Ver Detalhes
          </button>
        </div>
        <div className={styles.orderDetails}>
          <p>Data: {order.date}</p>
          <p>Status: {order.status}</p>
          <p>Total: {order.total}</p>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box className={styles.modalBox}>
          <Typography variant="h6" component="h2" >
            <h1 className={styles.detalhes}>Detalhes do Pedido #{order.id}</h1>
          </Typography>

          <div className={styles.modalContent}>
            <p><strong>Data do Pedido:</strong> {order.date}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Valor Total:</strong> {order.total}</p>
            <p><strong>Produtos:</strong></p>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.quantity} x {item.price}
                </li>
              ))}
            </ul>
          </div>

          <Button onClick={handleClose} className={styles.closeButton}>
            <h2 className={styles.buttonclose}>Fechar</h2>
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default OrderCard;
