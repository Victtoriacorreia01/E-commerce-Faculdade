'use client';
import { useState, useEffect } from 'react';
import { FaShoppingCart, FaHeart, FaUserPlus } from 'react-icons/fa';
import Logo from '../../../src/assets/logo2.png';
import styles from '../../Shared/Styles/Header.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Função para lidar com a busca
  const handleSearch = (e) => {
    e.preventDefault();
    const searchURL = `/search?query=${encodeURIComponent(searchQuery)}`;
    navigate(searchURL);
  };

  // Simulação de recuperação dos itens no carrinho ao carregar a página
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItemsCount(storedCart.length);
  }, []);

  return (
    <header>
      <div className={styles.bgWhite}>
        <div className={`${styles.container} ${styles.py4}`}>
          <div className={`${styles.flex} ${styles.justifyEnd} ${styles.itemsCenter}`}>
            <div className={styles.flexItemsCenter}>
              <ul className={`${styles.flex} ${styles.spaceX4}`}>
                <li>
                  <Link to="login/login" className={styles.navLink}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/shop/contato" className={styles.navLink}>
                    Contato
                  </Link>
                </li>
                <li>
                  <Link to="/shop/patrocinio" className={styles.navLink}>
                    Meus pedidos!
                  </Link>
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
                <li>
                  <Link to="/" className={styles.navbarLink}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/fem/female" className={styles.navbarLink}>
                    Feminino
                  </Link>
                </li>
                <li className={styles.relative}>
                  <Link to="/man/men" className={styles.navbarLink}>
                    Masculino
                    <i className={`${styles.icon} ${styles.ml1}`}></i>
                  </Link>
                </li>
                <li>
                  <Link to="/sport/sport" className={styles.navbarLink}>
                    Esporte
                  </Link>
                </li>
                <li>
                  <Link to="/beauty/page" className={styles.navbarLink}>
                    Beleza
                    <i className={`${styles.icon} ${styles.ml1}`}></i>
                  </Link>
                </li>
              </ul>
              <form onSubmit={handleSearch} className={styles.searchForm}>
                <span className={styles.iconLarge}>
                  <i className="ri-search-line"></i>
                </span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Procure por seu produto"
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                  Procure
                </button>
              </form>
              <div className={`${styles.flex} ${styles.spaceX4} ${styles.divnav}`}>
                <Link to="register/register">
                  <FaUserPlus className={styles.iconWhite} />
                </Link>
                <Link to="favorite/favorite">
                  <FaHeart className={styles.iconWhite} />
                </Link>
                <Link to="/cart/cart" className={styles.cartIconContainer}>
                  <FaShoppingCart className={styles.iconWhite} />
                  {cartItemsCount > 0 && (
                    <span className={styles.cartItemCount}>{cartItemsCount}</span>
                  )}
                </Link>
              </div>
            </nav>
            <div className={styles.freeShipping}>
              <p className={styles.freeShippingText}>Frete grátis em todos os produtos!!</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
