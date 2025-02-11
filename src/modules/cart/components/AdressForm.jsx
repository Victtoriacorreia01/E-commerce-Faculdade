import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/AddressForm.module.css';

const AddressForm = () => {
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
  const navigate = useNavigate();
  const location = useLocation();
  const { total } = location.state || { total: 0 };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Nome completo é obrigatório';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Número de telefone é obrigatório';
    if (!formData.postalCode) newErrors.postalCode = 'CEP é obrigatório';
    if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório';
    if (!formData.state) newErrors.state = 'Estado é obrigatório';
    if (!formData.city) newErrors.city = 'Cidade é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      navigate('/cart/payment', { state: { total, address: formData } });
    }
  };

  return (
    <div className={styles.div}>
    <div className={styles.container}>
      <h1 className={styles.h1}>Endereço de Entrega</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Nome Completo:</label>
          <input 
            type="text" 
            name="fullName" 
            value={formData.fullName} 
            onChange={handleChange} 
          />
          {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}
        </div>
        
        <div className={styles.inputGroup}>
          <label>Número de Telefone:</label>
          <input 
            type="text" 
            name="phoneNumber" 
            value={formData.phoneNumber} 
            onChange={handleChange} 
          />
          {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>CEP:</label>
          <input 
            type="text" 
            name="postalCode" 
            value={formData.postalCode} 
            onChange={handleChange} 
          />
          {errors.postalCode && <p className={styles.error}>{errors.postalCode}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Informações Adicionais:</label>
          <textarea 
            name="additionalInfo" 
            value={formData.additionalInfo} 
            onChange={handleChange} 
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Bairro:</label>
          <input 
            type="text" 
            name="neighborhood" 
            value={formData.neighborhood} 
            onChange={handleChange} 
          />
        </div>

        <div className={styles.inputGroup}>
          <label>CPF:</label>
          <input 
            type="text" 
            name="cpf" 
            value={formData.cpf} 
            onChange={handleChange} 
          />
          {errors.cpf && <p className={styles.error}>{errors.cpf}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Estado:</label>
          <input 
            type="text" 
            name="state" 
            value={formData.state} 
            onChange={handleChange} 
          />
          {errors.state && <p className={styles.error}>{errors.state}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Cidade:</label>
          <input 
            type="text" 
            name="city" 
            value={formData.city} 
            onChange={handleChange} 
          />
          {errors.city && <p className={styles.error}>{errors.city}</p>}
        </div>

        <div className={styles.checkboxGroup}>
          <label>
            <input 
              type="checkbox" 
              name="defaultAddress" 
              checked={formData.defaultAddress} 
              onChange={handleChange} 
            />
            Tornar este endereço padrão
          </label>
        </div>

        <button type="submit" className={styles.continueButton}>Continuar</button>
      </form>
    </div>
    </div>
  );
};

export default AddressForm;
