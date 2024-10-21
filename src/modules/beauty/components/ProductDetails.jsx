// components/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/ProductService';
import { AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai';

const ProductDetail = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduto(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
        setError('Não foi possível carregar o produto.');
      }
    };

    fetchProduct();
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  if (error) {
    return <div className="text-center mt-10 text-xl text-red-500">{error}</div>;
  }

  if (!produto) {
    return <div className="text-center mt-10 text-xl">Carregando...</div>;
  }

  return (
    <div className="container mx-auto mt-20 mb-20 p-6">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Imagem do Produto */}
        <img
          src={`http://localhost:8080/${produto.imageUrl}`}
          alt={produto.name}
          className="w-full md:w-1/2 object-cover h-96"
        />

        {/* Detalhes do Produto */}
        <div className="p-6 md:ml-10 flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800">{produto.name}</h1>
            <button onClick={toggleFavorite} className="text-pink-700 text-3xl">
              {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </div>

          <p className="text-2xl text-green-600 mt-2">R$ {produto.price.toFixed(2)}</p>

          <p className="text-gray-600 mt-4 leading-relaxed">{produto.details}</p>

          <button className="mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-green-200 text-black rounded-lg hover:bg-pink-400 transition">
            <AiOutlineShoppingCart className="text-xl" />
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
