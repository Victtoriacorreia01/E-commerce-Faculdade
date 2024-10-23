import React from 'react';
import { FaFacebook, FaGoogle, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MdPhone, MdEmail } from 'react-icons/md';
import Logo from '../../../src/assets/logo2.png'; // Atualize o caminho para a logo
import styles from '../../Shared/Styles/Footer.module.css'; // Importe o CSS module

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo e Newsletter */}
        <div>
          <img src={Logo} alt="Logo da Empresa" className={styles.logo} />
          <div className={styles.newsletter}>
            <p>Inscreva-se na Newsletter</p>
            <div className="flex">
              <input type="email" placeholder="Digite seu email" />
              <button>Inscrever</button>
            </div>
          </div>
        </div>

        {/* Informação */}
        <div>
          <h3 className={styles.h}>Informações</h3>
          <ul className={styles.list}>
            <li className={styles['list-item']}>Sobre Nós</li>
            <li className={styles['list-item']}>Blog</li>
            <li className={styles['list-item']}>Depoimentos</li>
          </ul>
        </div>

        {/* Links Úteis */}
        <div>
          <h3 className={styles.h}>Links Úteis</h3>
          <ul className={styles.list}>
            <li className={styles['list-item']}>Suporte</li>
            <li className={styles['list-item']}>Termos e Condições</li>
            <li className={styles['list-item']}>Política de Privacidade</li>
          </ul>
        </div>

        {/* Nossos Serviços */}
        <div>
          <h3 className={styles.h}>Serviços</h3>
          <ul className={styles.list}>
            <li className={styles['list-item']}>Lista de Marcas</li>
            <li className={styles['list-item']}>Pedidos</li>
            <li className={styles['list-item']}>Troca e Devolução</li>
            <li className={styles['list-item']}>Lista de Moda</li>
            <li className={styles['list-item']}>Blog</li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h3 className={styles.h}>Contato</h3>
          <p className={styles['contact-info']}>
            <MdPhone /> <span className={styles.num}>+55 (99) 99999-9999</span>
          </p>
          <p className={styles['contact-info']}>
            <MdEmail /> <span className={styles.email}>Ziara@gmail.com</span>
          </p>
          <div className={styles['social-icons']}>
            <FaFacebook className={styles['social-icon']} size={24} />
            <FaGoogle className={styles['social-icon']} size={24} />
            <FaTwitter className={styles['social-icon']} size={24} />
            <FaInstagram className={styles['social-icon']} size={24} />
          </div>
        </div>
      </div>

      {/* Rodapé Inferior */}
      <div className={styles['footer-bottom']}>
        <p className={styles.direitos}>2024 © Ziara. | Todos os direitos reservados</p>
        <div>
          <a href="#" className={styles['footer-link']}>FAQ</a>
          <a href="#" className={styles['footer-link']}>Privacidade</a>
          <a href="#" className={styles['footer-link']}>Termos e Condições</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
