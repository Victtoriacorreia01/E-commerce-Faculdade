import { useState, useEffect } from 'react';
import { FaShoppingCart, FaHeart, FaUserPlus, FaSearch } from 'react-icons/fa';
import Logo from '../../../src/assets/logo2.png';
import styles from '../../Shared/Styles/Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../../../src/hooks/use-cart';
import { useAuth } from '../../../src/AuthContext';
import { getCartItemCount } from '../../modules/cart/services/CartService'; 

export default function Header() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemsCount, setCartItemsCount] = useState(cart.length);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const count = await getCartItemCount();
        setCartItemCount(count);
      } catch (error) {
        console.error("Erro ao obter a contagem de itens do carrinho:", error);
      }
    };
  
    fetchCartCount();
  }, [cart]); 

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
      const totalItems = storedCart.items.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartItemCount(totalItems);
    };
  
    window.addEventListener('storage', updateCartCount);
  
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);
  
  
  
  
  useEffect(() => {
    console.log("Carrinho atualizado:", cart);
    const totalItems = cart.reduce((acc, item) => acc + (item.quantidade || 1), 0);
    setCartItemsCount(totalItems);
  }, [cart]);
  

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
        navigate(`search/search?query=${encodeURIComponent(searchQuery)}`);
        setSearchQuery(''); 
    }
};



  const toggleAccountMenu = () => {
    setShowAccountMenu((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (
      showAccountMenu &&
      !e.target.closest(`.${styles.accountMenu}`) &&
      !e.target.closest(`.${styles.userIcon}`)
    ) {
      setShowAccountMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showAccountMenu]);

  

  const handleLogout = () => {
    console.log("Logout clicado!"); 
    logout(); 
    console.log("Redirecionando para a homepage..."); 
    navigate('/', { replace: true }); 
};



  return (
    <header>
      <div className={styles.freeShipping}>
        <p className={styles.freeShippingText}>
        Free shipping on orders over R$200
        </p>
      </div>

      <div className={styles.bgWhite}>
        <div className={`${styles.container} ${styles.py4}`}>
          <div className={`${styles.flex} ${styles.justifyEnd} ${styles.itemsCenter}`}>
            <div className={styles.flexItemsCenter}>
              <ul className={`${styles.flex} ${styles.spaceX4}`}>
                <li>
                  <Link to="/login/login" className={styles.navLink}>Login</Link>
                </li>
                <li>
                  <Link to="/contact/contact" className={styles.navLink}>Contact</Link>
                </li>
                <li>
                  <Link to="/order/order" className={styles.navLink}>My Orders</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bgBlack}>
        <div className={`${styles.container} ${styles.py4}`}>
          <div className={`${styles.flex} ${styles.itemsCenter}`}>
            <div className={styles.mtNegative10}>
              <img src={Logo} alt="Logo da Empresa" width={200} height={100} />
            </div>
            <nav className={`${styles.wFull} ${styles.navbar}`}>
              <ul className={`${styles.flex} ${styles.spaceX10}`}>
              <li><Link to="/" className={styles.navbarLink}>Home</Link></li>
                <li><Link to="/fem/female" className={styles.navbarLink}>Female</Link></li>
                <li><Link to="/man/men" className={styles.navbarLink}>Male</Link></li>
                <li><Link to="/sport/sport" className={styles.navbarLink}>Sports</Link></li>
                <li><Link to="/beauty/page" className={styles.navbarLink}>Beauty</Link></li>
              </ul>
              <form onSubmit={handleSearch} className={styles.searchForm}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for anything" 
                    className={styles.searchInput}
                  />
                  <button type="submit" className={styles.searchButton}>
                    <FaSearch className={styles.searchIcon} /> 
                  </button>
                </form>
              <div className={`${styles.flex} ${styles.spaceX4} ${styles.divnav}`}>
              {isAuthenticated ? (
              <div className={styles.relative}>
                <FaUserPlus
                  className={`${styles.iconWhite} ${styles.userIcon}`}
                  onClick={toggleAccountMenu}
                />
            {showAccountMenu && (
              <div className={`${styles.accountMenu} ${showAccountMenu ? styles.show : ''}`}>
                <Link to="/account/account" className={styles.accountMenuItem}>My Profile</Link>
                <Link to="/order/order" className={styles.accountMenuItem}>My Orders</Link>
                <Link to="/account/coupons" className={styles.accountMenuItem}>My Coupons</Link>
                <button
                  onClick={handleLogout}
                  className={styles.accountMenuItem}
                >
                  Exit
                </button>
              </div>
            )}
          </div>
                  ) : (
                    <Link to="/register/register">
                      <FaUserPlus className={styles.iconWhite} />
                    </Link>
                  )}

                <FaHeart
                  className={styles.iconWhite}
                  onClick={() =>
                    isAuthenticated ? navigate('/favorite/favorite') : navigate('/login/login')
                  }
                />
                <Link to="/cart/cart" className={styles.cartIconContainer}>
                  <FaShoppingCart className={styles.iconWhite} />
                  {cartItemCount > 0 && (
                    <span className={styles.cartItemsCount}>{cartItemCount}</span>
                  )}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
