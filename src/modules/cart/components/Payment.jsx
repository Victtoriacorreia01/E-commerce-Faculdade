// src/modules/payment/Payment.js
import React from 'react';
import styles from '../styles/Payment.module.css'; 


const Payment = () => {
  return (
    <div className={styles.paymentContainer}>
      <h1 className={styles.title}>Página de Pagamento</h1>
      <p>Insira suas informações de pagamento abaixo:</p>
      <form className={styles.paymentForm}>
        <div>
          <label htmlFor="cardNumber">Número do Cartão:</label>
          <input type="text" id="cardNumber" required />
        </div>
        <div>
          <label htmlFor="expiryDate">Data de Validade:</label>
          <input type="text" id="expiryDate" required placeholder="MM/AA" />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" required />
        </div>
        <button type="submit">Finalizar Pagamento</button>
      </form>
    </div>
  );
};

export default Payment;
