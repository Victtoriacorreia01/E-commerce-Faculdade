import React, { useState } from 'react';
import styles from '../styles/Payment.module.css'; 

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (method) => {
    setSelectedMethod(method);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMethod('');
  };

  return (
    <div className={styles.container}>
    <div className={styles.paymentContainer}>
      <h1 className={styles.title}>Escolha a Forma de Pagamento</h1>
      <p className={styles.description}>Selecione uma das opções abaixo:</p>

      {/* Opções de métodos de pagamento com ícones */}
      <div className={styles.paymentMethods}>
        <button onClick={() => openModal('cartao')} className={styles.paymentButton}>
          <i className="fas fa-credit-card"></i> {/* Ícone de Cartão de Crédito */}
        </button>
        <button onClick={() => openModal('paypal')} className={styles.paymentButton}>
          <i className="fab fa-paypal"></i> {/* Ícone de PayPal */}
        </button>
        <button onClick={() => openModal('boleto')} className={styles.paymentButton}>
          <i className="fas fa-barcode"></i> {/* Ícone de Boleto */}
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>

            {selectedMethod === 'cartao' && (
              <div>
                <h2>Pagamento com Cartão de Crédito</h2>
                <form className={styles.paymentForm}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="cardNumber">Número do Cartão:</label>
                    <input type="text" id="cardNumber" className={styles.inputField} required placeholder="1234 5678 9101 1121" />
                  </div>
                  <div className={styles.row}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="expiryDate">Data de Validade:</label>
                      <input type="text" id="expiryDate" className={styles.inputField} required placeholder="MM/AA" />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="cvv">CVV:</label>
                      <input type="text" id="cvv" className={styles.inputField} required placeholder="123" />
                    </div>
                  </div>
                  <button type="submit" className={styles.submitButton}>Finalizar Pagamento</button>
                </form>
              </div>
            )}

            {selectedMethod === 'paypal' && (
              <div>
                <h2>Pagamento com PayPal</h2>
                <p>Você será redirecionado para o PayPal para finalizar seu pagamento.</p>
                <button className={styles.submitButton}>Pagar com PayPal</button>
              </div>
            )}

            {selectedMethod === 'boleto' && (
              <div>
                <h2>Pagamento com Boleto Bancário</h2>
                <p>O boleto será gerado e enviado para o seu e-mail.</p>
                <button className={styles.submitButton}>Gerar Boleto</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Payment;
