// components/ProductPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails'; 

const produtos = [

];

const ProductPage = () => {
  const { id } = useParams();
  const produto = produtos.find((prod) => prod.id === parseInt(id, 10));

  if (!produto) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div>
      <ProductDetails produto={produto} />
    </div>
  );
};

export default ProductPage;
