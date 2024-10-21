import React from 'react';
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center">
      <div className="flex justify-center space-x-6 mb-4">
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition-colors duration-300"
        >
          <FaInstagram size={30} />
        </a>
        <a
          href="https://www.tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors duration-300"
        >
          <FaTiktok size={30} />
        </a>
        <a
          href="https://www.whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400 transition-colors duration-300"
        >
          <FaWhatsapp size={30} />
        </a>
      </div>
      <p className="text-sm">&copy; {new Date().getFullYear()} Ziara. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
