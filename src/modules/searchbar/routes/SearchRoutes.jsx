import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Searchbar  from '../pages/Searchbar'; 
const SearchRoutes = () => (
  <Routes>
    <Route path="/search" element={<Searchbar />} />
  </Routes>
);

export default SearchRoutes;
