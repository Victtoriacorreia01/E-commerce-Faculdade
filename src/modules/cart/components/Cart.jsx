import React, { useEffect, useState } from 'react'; 
import { getCart, removeFromCart, decrementQuantity, clearCart, incrementQuantity } from '../services/CartService';
import styles from '../styles/Cart.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await getCart();
        console.log('Dados do carrinho:', cartData);
        setCart(cartData.items || []);
        calculateTotal(cartData.items || []);
      } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
      }
    };

    loadCart();
  }, []);

  const calculateTotal = (cartItems) => {
    const newTotal = cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = item.quantity ? parseInt(item.quantity, 10) : 1;
      return acc + price * quantity;
    }, 0);
  
    setTotal(newTotal.toFixed(2));
  };

  const handleRemoveItem = async (id) => {
    await removeFromCart(id);
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  const handleDecreaseQuantity = async (id) => {
    await decrementQuantity(id);
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  const handleIncreaseQuantity = async (id) => {
    try {
      const updatedCartData = await incrementQuantity(id);
      console.log('Dados atualizados do carrinho:', updatedCartData);
      setCart(updatedCartData.items || []);
      setTotal(updatedCartData.total || 0);
    } catch (error) {
      console.error('Erro ao aumentar quantidade:', error);
    }
  };

  const handleClearCart = async () => {
    await clearCart();
    setCart([]);
    setTotal(0);
  };

  const handleCheckout = () => {
    navigate('/cart/Adress', { state: { total } }); // Enviando o total através do estado
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
                <img 
                  src={item.imageUrl ? `http://localhost:8080/${item.imageUrl}` : 'default-image.jpg'} 
                  alt={item.name || 'Produto'} 
                  width={150} 
                  height={150} 
                  className={styles.imgproduct} 
                />
                <div>
                  <h2>{item.name || 'Produto sem nome'}</h2>
                  <p>Preço: R$ {parseFloat(item.price || 0).toFixed(2)}</p>
                  <div className={styles.cartItemActions}>
                    <div className={styles.cartQuantityContainer}>
                      <button className={styles.quantityButton} onClick={() => handleDecreaseQuantity(item.id)} disabled={(item.quantity || 1) <= 1}>-</button>
                      <span className={styles.cartQuantity}>{item.quantity || 1}</span>
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
