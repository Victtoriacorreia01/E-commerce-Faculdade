import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCreditCard, FaMoneyCheckAlt, FaPaypal, FaQrcode } from 'react-icons/fa'; // Incluído ícone para PIX
import styles from '../styles/Payment.module.css';

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [installments, setInstallments] = useState(1);
  const [qrCode, setQrCode] = useState('1234567890'); // Código de exemplo para PIX
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState({});
  const location = useLocation();
  const { total, address } = location.state || { total: 0, address: {} };

  const openModal = (method) => {
    setSelectedMethod(method);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMethod('');
  };

  const openEditModal = () => {
    setEditAddress({ ...address });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditAddress({ ...editAddress, [name]: value });
  };

  const calculateInstallmentValue = (total, installments) => {
    return (total / installments).toFixed(2);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Código copiado para a área de transferência!');
  };

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.paymentBox}>
        <h1 className={styles.paymentTitle}>Escolha a Forma de Pagamento</h1>

        <div className={styles.totalContainer}>
          <h2 className={styles.totalText}>Total da Compra: R$ {parseFloat(total).toFixed(2)}</h2>
        </div>

        {address && (
          <div className={styles.addressContainer}>
            <h3 className={styles.addressTitle}>Endereço de Entrega</h3>
            <p className={styles.addressText}>Nome: {address.fullName}</p>
            <p className={styles.addressText}>Telefone: {address.phoneNumber}</p>
            <p className={styles.addressText}>CEP: {address.postalCode}</p>
            <p className={styles.addressText}>Cidade: {address.city}</p>
            <p className={styles.addressText}>Estado: {address.state}</p>
            <p className={styles.addressText}>{address.additionalInfo && `Informações adicionais: ${address.additionalInfo}`}</p>
            <button onClick={openEditModal} className={styles.editAddressButton}>Editar Endereço</button>
          </div>
        )}

        <div className={styles.paymentButtons}>
          <button
            onClick={() => openModal('credit')}
            className={`${styles.paymentButton} ${styles.cardButton}`}
          >
            <FaCreditCard size={24} />
          </button>
          <button
            onClick={() => openModal('boleto')}
            className={`${styles.paymentButton} ${styles.boletoButton}`}
          >
            <FaMoneyCheckAlt size={24} />
          </button>
          <button
            onClick={() => openModal('paypal')}
            className={`${styles.paymentButton} ${styles.paypalButton}`}
          >
            <FaPaypal size={24} />
          </button>
          <button
            onClick={() => openModal('pix')}
            className={`${styles.paymentButton} ${styles.pixButton}`}
          >
            <FaQrcode size={24} />
          </button>
        </div>

        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>
                {selectedMethod === 'credit' ? 'Cartão de Crédito' :
                 selectedMethod === 'boleto' ? 'Boleto Bancário' :
                 selectedMethod === 'paypal' ? 'PayPal' : 'PIX'}
              </h2>

              {selectedMethod === 'credit' && (
                <div className={styles.installmentContainer}>
                  <label htmlFor="installments" className={styles.installmentLabel}>
                    Número de Parcelas:
                  </label>
                  <input
                    type="number"
                    id="installments"
                    min="1"
                    max="12"
                    value={installments}
                    onChange={(e) => setInstallments(Number(e.target.value))}
                    className={styles.installmentInput}
                  />
                  <p className={styles.installmentText}>Valor por parcela: R$ {calculateInstallmentValue(total, installments)}</p>
                </div>
              )}

              {selectedMethod === 'pix' && (
                <div className={styles.pixContainer}>
                  <p className={styles.pixText}>Código PIX para Pagamento:</p>
                  <div className={styles.pixCodeContainer}>
                    <input
                      type="text"
                      readOnly
                      value={qrCode}
                      className={styles.pixCodeInput}
                    />
                    <button onClick={() => copyToClipboard(qrCode)} className={styles.copyButton}>
                      Copiar Código
                    </button>
                  </div>
                </div>
              )}

              {selectedMethod === 'boleto' && (
                <button className={`${styles.modalButton} ${styles.generateButton}`}>
                  Gerar Boleto
                </button>
              )}

              {selectedMethod === 'paypal' && (
                <div className={styles.paypalContainer}>
                  <a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer" className={styles.paypalLink}>
                    Pague com PayPal
                  </a>
                </div>
              )}

              <div className={styles.modalButtons}>
                <button
                  onClick={closeModal}
                  className={`${styles.modalButton} ${styles.cancelButton}`}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {isEditModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>Editar Endereço de Entrega</h2>
              <form>
                <label>Nome:</label>
                <input
                  type="text"
                  name="fullName"
                  value={editAddress.fullName}
                  onChange={handleEditChange}
                  className={styles.editInput}
                />
                <label>Telefone:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={editAddress.phoneNumber}
                  onChange={handleEditChange}
                  className={styles.editInput}
                />
                <label>CEP:</label>
                <input
                  type="text"
                  name="postalCode"
                  value={editAddress.postalCode}
                  onChange={handleEditChange}
                  className={styles.editInput}
                />
                <label>Cidade:</label>
                <input
                  type="text"
                  name="city"
                  value={editAddress.city}
                  onChange={handleEditChange}
                  className={styles.editInput}
                />
                <label>Estado:</label>
                <input
                  type="text"
                  name="state"
                  value={editAddress.state}
                  onChange={handleEditChange}
                  className={styles.editInput}
                />
                <label>Informações adicionais:</label>
                <input
                  type="text"
                  name="additionalInfo"
                  value={editAddress.additionalInfo || ''}
                  onChange={handleEditChange}
                  className={styles.editInput}
                />
              </form>
              <div className={styles.modalButtons}>
                <button onClick={closeEditModal} className={`${styles.modalButton} ${styles.cancelButton}`}>
                  Cancelar
                </button>
                <button onClick={closeEditModal} className={`${styles.modalButton} ${styles.confirmButton}`}>
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
