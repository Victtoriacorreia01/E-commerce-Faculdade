// pages/ProductPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetails'; // Correção na importação
import { getProductById } from '../services/ProductService'; 

const ProductPage = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const produtoData = await getProductById(id);
        setProduto(produtoData);
      } catch (error) {
        setError('Produto não encontrado.');
        console.error('Erro ao buscar produto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <div className="text-center mt-10 text-xl text-red-500">{error}</div>;
  }

  if (!produto) {
    return <div className="text-center mt-10 text-xl">Carregando...</div>;
  }

  return <ProductDetail produto={produto} />;
};

export default ProductPage;
