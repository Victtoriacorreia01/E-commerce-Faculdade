import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartProvider'; // Ajuste o caminho conforme necessário
import styles from '../styles/Cart.module.css';

import pag1 from '../../../../src/assets/mastercard.jpg';
import pag2 from '../../../../src/assets/nubank.jpg';
import pag3 from '../../../../src/assets/pix.jpg';
import pag4 from '../../../../src/assets/hipercard.jpg';
import pag5 from '../../../../src/assets/caixa.jpg';
import pag6 from '../../../../src/assets/paypal.jpg';

const Cart = () => {
  const { cart, removeProductFromCart, productCartIncrement, productCartDecrement } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      const newTotal = cart.reduce((acc, item) => {
        const preco = parseFloat(item.preco);
        const quantidade = item.quantidade || 1;

        if (isNaN(preco)) {
          console.warn(`Dados inválidos para o item ${item.nome}. Preço: ${preco}`);
          return acc;
        }

        return acc + (preco * quantidade);
      }, 0).toFixed(2);

      setTotal(newTotal);
    };

    calculateTotal();
  }, [cart]);

  const handleRemoveItem = (id) => {
    removeProductFromCart(id);
  };

  const handleIncreaseQuantity = (id) => {
    productCartIncrement(id);
  };

  const handleDecreaseQuantity = (id) => {
    productCartDecrement(id);
  };

  const handleCheckout = () => {
    // Implemente a navegação para a página de pagamento
    console.log(`Redirecionando para pagamento com total: R$ ${total}`);
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartItems}>
        <h2 className={styles.cartTitle}>Todos os itens ({cart.length})</h2>
        {cart.map((item) => (
          <div className={styles.cartItem} key={item.id}>
            <div className={styles.cartItemImage}>

              <img src={item.imagem} alt={item.nome} width={80} height={80} />
            </div>
            <div className={styles.cartItemInfo}>
              <p className={styles.cartItemName}>{item.nome}</p>
              <p className={styles.cartItemPrice}>Preço: R$ {parseFloat(item.preco).toFixed(2)}</p>
              <div className={styles.cartItemActions}>
                <button
                  className={styles.cartActionButton}
                  onClick={() => handleDecreaseQuantity(item.id)}
                  disabled={item.quantidade <= 1}
                >
                  -
                </button>
                <span className={styles.cartItemQuantity}>{item.quantidade}</span>
                <button
                  className={styles.cartActionButton}
                  onClick={() => handleIncreaseQuantity(item.id)}
                >
                  +
                </button>
              </div>
              <button
                className={styles.removeButton}
                onClick={() => handleRemoveItem(item.id)}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.orderSummary}>
        <h2 className={styles.orderSummaryTitle}>Resumo do Pedido</h2>
        <p className={styles.orderSummaryTotal}>Total: R$ {total}</p>
        <button className={styles.orderButton} onClick={handleCheckout}>
          Compre Agora
        </button>
      </div>
      <div className={styles.paymentMethods}>
        <h2 className={styles.paymentMethodsTitle}>Formas de Pagamento</h2>
        <div className={styles.paymentMethod}>
          <div className={styles.paymentMethodImage}>
            <img src={pag1} alt="MasterCard" width={80} height={50} />
          </div>
          <div>
            <p className={styles.paymentMethodName}>MasterCard</p>
            <p className={styles.paymentMethodDescription}>Cartão de crédito MasterCard</p>
          </div>
        </div>
        <div className={styles.paymentMethod}>
          <div className={styles.paymentMethodImage}>
            <img src={pag2} alt="Nubank" width={80} height={50} />
          </div>
          <div>
            <p className={styles.paymentMethodName}>Nubank</p>
            <p className={styles.paymentMethodDescription}>Cartão de crédito Nubank</p>
          </div>
        </div>
        <div className={styles.paymentMethod}>
          <div className={styles.paymentMethodImage}>
            <img src={pag3} alt="Pix" width={50} height={50} />
          </div>
          <div>
            <p className={styles.paymentMethodName}>Pix</p>
            <p className={styles.paymentMethodDescription}>Pagamento instantâneo via Pix</p>
          </div>
        </div>
        <div className={styles.paymentMethod}>
          <div className={styles.paymentMethodImage}>
            <img src={pag4} alt="Hipercard" width={80} height={50} />
          </div>
          <div>
            <p className={styles.paymentMethodName}>Hipercard</p>
            <p className={styles.paymentMethodDescription}>Cartão de crédito Hipercard</p>
          </div>
        </div>
        <div className={styles.paymentMethod}>
          <div className={styles.paymentMethodImage}>
            <img src={pag5} alt="Caixa" width={80} height={50} />
          </div>
          <div>
            <p className={styles.paymentMethodName}>Caixa</p>
            <p className={styles.paymentMethodDescription}>Cartão de crédito Caixa</p>
          </div>
        </div>
        <div className={styles.paymentMethod}>
          <div className={styles.paymentMethodImage}>
            <img src={pag6} alt="PayPal" width={80} height={50} />
          </div>
          <div>
            <p className={styles.paymentMethodName}>PayPal</p>
            <p className={styles.paymentMethodDescription}>Pagamento via PayPal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
