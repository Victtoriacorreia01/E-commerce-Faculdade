import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ContactPage from '../pages/ContactPage'; // Importe a página de contato

const ContactRoutes = () => (
  <Routes>
    <Route path="/contact" element={<ContactPage />} />
    {/* Adicione outras rotas filhas aqui, se necessário */}
  </Routes>
);

export default ContactRoutes;
