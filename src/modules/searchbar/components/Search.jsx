import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProducts } from '../services/SearchService';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const Search = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('query');
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [location]);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const produtos = await searchProducts(searchQuery);
      setResults(produtos);
    } catch (error) {
      console.error('Erro durante a pesquisa:', error);
      setError('Erro ao buscar produtos.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToFavorites = (produto) => {
    // Lógica para adicionar aos favoritos
    console.log(`Adicionado aos favoritos: ${produto.name}`);
  };

  const handleAddToCart = (produto) => {
    // Lógica para adicionar ao carrinho
    console.log(`Adicionado ao carrinho: ${produto.name}`);
  };

  return (
    <div className="container mx-auto mt-28 mb-16 text-black">
      {isLoading ? (
        <p className="text-gray-600">Buscando...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {results.map((produto) => (
            <div
              key={produto.id}
              className="border rounded-md p-4 shadow-md transition-transform duration-300 hover:shadow-lg hover:"
            >
              <img
                src={`http://localhost:8080/${produto.imageUrl}`}
                alt={produto.name}
                className="w-full h-40 object-contain mb-2"
              />
              <h2 className="text-lg font-semibold mt-2 text-black hover:text-pink-700">{produto.name}</h2>
              <p className="text-gray-600">R$ {produto.price.toFixed(2)}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleAddToFavorites(produto)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-300"
                >
                  <FaHeart size={24} />
                </button>
                <button
                  onClick={() => handleAddToCart(produto)}
                  className="text-green-500 hover:text-green-700 transition-colors duration-300"
                >
                  <FaShoppingCart size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-600">Nenhum produto encontrado.</p>
      )}
    </div>
  );
};

export default Search;
