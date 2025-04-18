import React from 'react';
import { FaFacebook, FaGoogle, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MdPhone, MdEmail } from 'react-icons/md';
import Logo from '../../../src/assets/logo.png';
import styles from '../../Shared/Styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
          <img src={Logo} alt="Company Logo" className={styles.logo} />
          <div className={styles.newsletter}>
            <p>Subscribe to the Newsletter</p>
            <div className="flex">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        <div>
          <h3 className={styles.h}>Information</h3>
          <ul className={styles.list}>
            <li className={styles['list-item']}>About Us</li>
            <li className={styles['list-item']}>Blog</li>
            <li className={styles['list-item']}>Testimonials</li>
          </ul>
        </div>

        <div>
          <h3 className={styles.h}>Useful Links</h3>
          <ul className={styles.list}>
            <li className={styles['list-item']}>Support</li>
            <li className={styles['list-item']}>Terms & Conditions</li>
            <li className={styles['list-item']}>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h3 className={styles.h}>Services</h3>
          <ul className={styles.list}>
            <li className={styles['list-item']}>Brand List</li>
            <li className={styles['list-item']}>Orders</li>
            <li className={styles['list-item']}>Exchange & Returns</li>
            <li className={styles['list-item']}>Fashion List</li>
            <li className={styles['list-item']}>Blog</li>
          </ul>
        </div>

        <div>
          <h3 className={styles.h}>Contact</h3>
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

      <div className={styles['footer-bottom']}>
        <p className={styles.direitos}>2024 © Ziara. | All rights reserved</p>
        <div>
          <a href="#" className={styles['footer-link']}>FAQ</a>
          <a href="#" className={styles['footer-link']}>Privacy</a>
          <a href="#" className={styles['footer-link']}>Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
