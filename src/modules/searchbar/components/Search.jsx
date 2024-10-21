import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProducts } from '../services/SearchService';

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

  return (
    <div className="container mx-auto mt-10">
      {isLoading ? (
        <p className="text-gray-600">Buscando...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map((produto) => (
            <div key={produto.id} className="border rounded-md p-4 shadow-md">
              <img src={`http://localhost:8080/${produto.imageUrl}`} alt={produto.name} className="w-full h-40 object-contain" />
              <h2 className="text-lg font-semibold mt-2">{produto.name}</h2>
              <p className="text-gray-600">R$ {produto.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Nenhum produto encontrado.</p>
      )}
    </div>
  );
};

export default Search;
