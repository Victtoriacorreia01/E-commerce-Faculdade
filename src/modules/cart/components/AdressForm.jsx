import React, { useState } from 'react';
import {
  FaCreditCard,
  FaMoneyCheckAlt,
  FaPaypal,
  FaQrcode,
  FaTimes,
} from 'react-icons/fa';
import styles from '../styles/AddressForm.module.css';
import { useLocation } from 'react-router-dom';
import { handlePayment } from '../services/checkoutService';

const CombinedCheckout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    postalCode: '',
    additionalInfo: '',
    neighborhood: '',
    cpf: '',
    state: '',
    city: '',
    defaultAddress: false,
  });

  const [errors, setErrors] = useState({});
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [installments, setInstallments] = useState(1);
  const [qrCode] = useState('1234567890');
  const location = useLocation();
  const total = location.state?.total || 0;
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [creditCardData, setCreditCardData] = useState({
    number: '',
    expiry: '',
    cvc: '', 
  });
  

  const [creditCardErrors, setCreditCardErrors] = useState({});

  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    setCreditCardData({
      ...creditCardData,
      [name]: value,
    });
  };
  

  const validateCreditCard = () => {
    const errors = {};

    if (!/^\d{16}$/.test(creditCardData.number)) {
      errors.number = 'Enter a valid 16-digit card number';
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(creditCardData.expiry)) {
      errors.expiry = 'Expiration date must be in MM/YY format';
    }

    if (!/^\d{3}$/.test(creditCardData.cvc)) {
      errors.cvc = 'CVC must be 3 digits';
    }
    

    if (installments < 1 || installments > 12) {
      errors.installments = 'Installments must be between 1 and 12';
    }

    setCreditCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name (minimum 3 characters)';
    }

    if (!formData.phoneNumber || !/^\d{10,11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number with area code (10 or 11 digits)';
    }

    if (!formData.postalCode || !/^\d{8}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Please enter a valid postal code (8 digits)';
    }

    if (!formData.neighborhood || formData.neighborhood.trim().length < 3) {
      newErrors.neighborhood = 'Please enter a valid neighborhood';
    }

    if (!formData.cpf || !/^\d{11}$/.test(formData.cpf)) {
      newErrors.cpf = 'Please enter a valid CPF (11 digits)';
    }

    if (!formData.state || formData.state.trim().length < 2) {
      newErrors.state = 'Please enter a state';
    }

    if (!formData.city || formData.city.trim().length < 2) {
      newErrors.city = 'Please enter a city';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompletePurchase = async () => {
    if (selectedMethod === 'credit' && !validateCreditCard()) {
      console.log("Dados do cartão enviados:", creditCardData);
      console.log("Parcelas:", installments);
      return;
    }

    if (!validate()) {
      return;
    }

    setIsProcessing(true);

    const shippingData = formData;
    const cardData = creditCardData;

    try {
      if (selectedMethod === 'credit') {
        await handlePayment({ shippingData, cardData, installments });
      }

      setIsProcessing(false);
      setIsModalOpen(false);
      setShowSuccessModal(true);

      setFormData({
        fullName: '',
        phoneNumber: '',
        postalCode: '',
        additionalInfo: '',
        neighborhood: '',
        cpf: '',
        state: '',
        city: '',
        defaultAddress: false,
      });
      setCreditCardData({
        number: '',
        expiry: '',
        cvc: '',
      });
      setErrors({});
      setCreditCardErrors({});
      setSelectedMethod('');
      setInstallments(1);

      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      setIsProcessing(false);
      alert('Erro ao processar o pagamento. Verifique os dados e tente novamente.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Endereço confirmado! Escolha um método de pagamento.');
    }
  };

  const openModal = (method) => {
    if (validate()) {
      setSelectedMethod(method);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMethod('');
  };

  const calculateInstallmentValue = (total, installments) => {
    return (total / installments).toFixed(2);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Código copiado!');
  };

  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2>Delivery Address</h2>
        <div className={styles.gridContainer}>
          {[ 'fullName', 'phoneNumber', 'postalCode', 'neighborhood', 'cpf', 'state', 'city' ].map((name) => (
            <div className={styles.inputGroup} key={name}>
              <label>{name.replace(/([A-Z])/g, ' $1')}:</label>
              <input type="text" name={name} value={formData[name]} onChange={handleChange} />
              {errors[name] && <p className={styles.error}>{errors[name]}</p>}
            </div>
          ))}
        </div>

        <div className={styles.inputGroup}>
          <label>Additional Information: </label>
          <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} />
        </div>

        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              name="defaultAddress"
              checked={formData.defaultAddress}
              onChange={handleChange}
            />
            Set as Default Address
          </label>
        </div>

        <button type="submit" className={styles.submitButton}>Confirm Address</button>
      </form>

      <div className={styles.paymentContainer}>
        <h2>Payment</h2>
        <p className={styles.total}>Total: R$ {parseFloat(total).toFixed(2)}</p>

        <div className={styles.methods}>
          <button onClick={() => openModal('credit')} className={styles.paymentButton}><FaCreditCard /> Credit Card</button>
          <button onClick={() => openModal('boleto')} className={styles.paymentButton}><FaMoneyCheckAlt /> Generate Slip</button>
          <button onClick={() => openModal('paypal')} className={styles.paymentButton}><FaPaypal /> PayPal</button>
          <button onClick={() => openModal('pix')} className={styles.paymentButton}><FaQrcode /> Pix</button>
        </div>

        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <button onClick={closeModal} className={styles.closeButton}><FaTimes /></button>
              <h3>
                {selectedMethod === 'credit'
                  ? 'Credit Card'
                  : selectedMethod === 'boleto'
                  ? 'Bank Slip'
                  : selectedMethod === 'paypal'
                  ? 'PayPal'
                  : 'Payment via Pix'}
              </h3>

              {selectedMethod === 'credit' && (
                <div className={styles.creditFields}>
                  <div>
                    <label>Card Number:</label>
                    <input type="text" name="number" value={creditCardData.number} onChange={handleCreditCardChange} placeholder="0000 0000 0000 0000" />
                    {creditCardErrors.number && <p className={styles.error}>{creditCardErrors.number}</p>}
                  </div>
                  <div>
                    <label>Expiration Date:</label>
                    <input type="text" name="expiry" value={creditCardData.expiry} onChange={handleCreditCardChange} placeholder="MM/YY" />
                    {creditCardErrors.expiry && <p className={styles.error}>{creditCardErrors.expiry}</p>}
                  </div>
                  <div>
                    <label>CVC:</label>
                    <input
  type="text"
  name="cvc"
  value={creditCardData.cvc}
  onChange={handleCreditCardChange}
  placeholder="123"
/>

                    {creditCardErrors.cvc && <p className={styles.error}>{creditCardErrors.cvc}</p>}
                  </div>
                  <div>
                    <label>Installments:</label>
                    <input type="number" min="1" max="12" value={installments} onChange={(e) => setInstallments(Number(e.target.value))} />
                    {creditCardErrors.installments && <p className={styles.error}>{creditCardErrors.installments}</p>}
                    <p>R$ {calculateInstallmentValue(total, installments)} per installment</p>
                  </div>
                  <button className={styles.finalizeButton} onClick={handleCompletePurchase} disabled={isProcessing}>
                    {isProcessing ? <span className={styles.spinner}></span> : 'Complete Purchase'}
                  </button>
                </div>
              )}

              {selectedMethod === 'pix' && (
                <div>
                  <p>PIX Code:</p>
                  <input type="text" readOnly value={qrCode} />
                  <button onClick={() => copyToClipboard(qrCode)}>Copy Code</button>
                </div>
              )}

              {selectedMethod === 'boleto' && <button>Generate Slip</button>}

              {selectedMethod === 'paypal' && (
                <a href="https://www.paypal.com" target="_blank" rel="noreferrer">
                  Go to PayPal
                </a>
              )}
            </div>
          </div>
        )}

        {showSuccessModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Purchase completed successfully.</h2>
              <p>Thank you for shopping with us!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedCheckout;
