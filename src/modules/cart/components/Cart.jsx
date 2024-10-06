import React, { useEffect, useState } from 'react';
import useCart from '../../../hooks/use-cart'; 
import styles from '../styles/Cart.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; 
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Cart = () => {
  const { cart, removeProductFromCart, productCartIncrement, productCartDecrement } = useCart();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate(); // Criar a instância do hook useNavigate

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

  const handleClearCart = () => {
    cart.forEach(item => handleRemoveItem(item.id));
  };

  const handleCheckout = () => {
    navigate('/cart/pagamento'); // Redirecionar para a página de pagamento dentro do contexto do carrinho
  };

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.title}>Meu Carrinho</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <img src={item.imagem} alt={item.nome} width={150} height={150} className={styles.imgproduct} />
                <div>
                  <h2>{item.nome}</h2>
                  <p>Preço: R$ {parseFloat(item.preco).toFixed(2)}</p>
                  <div className={styles.cartItemActions}>
                    <div className={styles.cartQuantityContainer}>
                      <button className={styles.quantityButton} onClick={() => handleDecreaseQuantity(item.id)} disabled={item.quantidade <= 1}>-</button>
                      <span className={styles.cartQuantity}>{item.quantidade}</span>
                      <button className={styles.quantityButton} onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                    </div>
                    <button className={styles.removeButton} onClick={() => handleRemoveItem(item.id)}>
                      <FontAwesomeIcon icon={faTrashAlt} className={styles.trashIcon} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.orderSummary}>
            <h2>Total: R$ {total}</h2>
            <div className={styles.buttonContainer}>
              <button className={styles.emptyCartButton} onClick={handleClearCart}>Esvaziar Carrinho</button>
              <button className={styles.orderButton} onClick={handleCheckout}>Compre Agora</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
