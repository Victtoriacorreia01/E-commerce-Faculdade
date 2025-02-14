import { useState, useEffect } from 'react';
import { FaShoppingCart, FaHeart, FaUserPlus, FaSearch } from 'react-icons/fa';
import Logo from '../../../src/assets/logo2.png';
import styles from '../../Shared/Styles/Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../../../src/hooks/use-cart';
import { useAuth } from '../../../src/AuthContext';
import { getCartItemCount } from '../../modules/cart/services/CartService'; // Verifique o caminho correto

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
  }, [cart]); // Atualiza quando o estado do carrinho muda

  
  
  
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
          Frete grátis para pedidos acima de R$200,00!
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
                  <Link to="/contact/contact" className={styles.navLink}>Contato</Link>
                </li>
                <li>
                  <Link to="/order/order" className={styles.navLink}>Meus pedidos!</Link>
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
                <li><Link to="/fem/female" className={styles.navbarLink}>Feminino</Link></li>
                <li><Link to="/man/men" className={styles.navbarLink}>Masculino</Link></li>
                <li><Link to="/sport/sport" className={styles.navbarLink}>Esporte</Link></li>
                <li><Link to="/beauty/page" className={styles.navbarLink}>Beleza</Link></li>
              </ul>
              <form onSubmit={handleSearch} className={styles.searchForm}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Procure oque deseja" 
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
                <Link to="/account/account" className={styles.accountMenuItem}>Meu Perfil</Link>
                <Link to="/order/order" className={styles.accountMenuItem}>Meus Pedidos</Link>
                <Link to="/account/coupons" className={styles.accountMenuItem}>Meus Cupons</Link>
                <button
                  onClick={handleLogout}
                  className={styles.accountMenuItem}
                >
                  Sair
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
