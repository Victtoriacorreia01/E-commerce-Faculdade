import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ContactPage from '../pages/ContactPage'; 

const ContactRoutes = () => (
  <Routes>
    <Route path="/contact" element={<ContactPage />} />
  </Routes>
);

export default ContactRoutes;
