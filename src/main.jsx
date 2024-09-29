import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from '../src/modules/cart/contexts/CartProvider';

ReactDOM.render(
  <CartProvider>
    <App />
  </CartProvider>,
  document.getElementById('root')
);

