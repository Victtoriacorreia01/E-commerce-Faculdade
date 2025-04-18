import React, { useEffect, useState } from 'react'; 
import { getCart, removeFromCart, decrementQuantity, clearCart, incrementQuantity, } from '../services/CartService';
import { createOrder } from '../services/CartService';
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
    
        if (!cartData.items || cartData.items.length === 0) {
          const localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
          setCart(localCart.items);
          calculateTotal(localCart.items);
        } else {
          setCart(cartData.items);
          calculateTotal(cartData.items);
          localStorage.setItem('cart', JSON.stringify(cartData)); 
        }
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        const localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
        setCart(localCart.items);
        calculateTotal(localCart.items);
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
      setCart(updatedCartData.items || []);
      setTotal(updatedCartData.total || 0);
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const handleClearCart = async () => {
    await clearCart();
    setCart([]);
    setTotal(0);
  };

  const handleCheckout = async () => {
    console.log('Botão de checkout clicado');
  
    try {
      const response = await createOrder();
      console.log('Pedido criado com sucesso:', response);
  
  
      navigate('/cart/address', { state: { total } });
    } catch (error) {
      console.error('Erro no checkout:', error);
      alert('Erro ao criar pedido');
    }
  };
  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.title}>My Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <img 
                  src={item.imageUrl ? `http://localhost:8080/${item.imageUrl}` : 'default-image.jpg'} 
                  alt={item.name || 'Product'} 
                  width={150} 
                  height={150} 
                  className={styles.imgproduct} 
                />
                <div>
                  <h2>{item.name || 'Unnamed Product'}</h2>
                  <p>Price: R$ {parseFloat(item.price || 0).toFixed(2)}</p>
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
              <button className={styles.emptyCartButton} onClick={handleClearCart}>Empty Cart</button>
              <button className={styles.orderButton} onClick={handleCheckout}>Checkout</button>
              </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
