import { poster } from '../../../../src/utils/axiosConfig';

export const handlePayment = async ({ shippingData, cardData, installments }) => {
  try {
    console.log('Payload enviado ao backend:', { 
      shippingData, 
      cardData, 
      installments 
    });

    const response = await poster('/payment/credit-card', {
      shippingData,
      cardData,
      installments,
    });

    console.log('Token armazenado:', localStorage.getItem('authToken'));

    return response.data;
  } catch (error) {
    console.error('Erro ao processar o pagamento:', error);
    throw error;
  }
};
