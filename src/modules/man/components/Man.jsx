import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import useCart from '../../../hooks/use-cart';
import { addToFavorites, removeFromFavorites } from '../../favorites/services/FavoriteService';
import { addToCart, getCart } from '../../cart/services/CartService';
import { getProductsByCategory } from '../services/MenService'; 

const Man = () => {
  const navigate = useNavigate();
  const { addProductIntoCart } = useCart();
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [produtos, setProdutos] = useState([]); 
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOption, setSortOption] = useState('relevancy');

  // useEffect para buscar produtos do backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategory();
        console.log('Dados recebidos:', data); // Verifique o que está sendo retornado
        setProdutos(
          data.map((produto) => ({
            id: produto.id,
            nome: produto.name,
            preco: produto.price,
            imagem: `http://localhost:8080/${produto.imageUrl}`,
            rating: produto.rating || 0, // Adiciona rating como 0 caso não exista
          }))
        );
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts(); // Chame a função para buscar produtos
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product.id);
      await fetchCart();
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  const toggleFavorite = async (produto) => {
    try {
      const isFavorite = favorites.includes(produto.id);
  
      if (isFavorite) {
        // Remove dos favoritos
        await removeFromFavorites(produto.id);
        setFavorites((prev) => {
          const updatedFavorites = prev.filter((id) => id !== produto.id);
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Sincroniza com localStorage
          return updatedFavorites;
        });
      } else {
        // Adiciona aos favoritos
        await addToFavorites(produto.id);
        setFavorites((prev) => {
          const updatedFavorites = [...prev, produto.id];
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Sincroniza com localStorage
          return updatedFavorites;
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar favoritos:', error);
    }
  };
  const fetchCart = async () => {
    try {
      const cartData = await getCart();
      setCart(cartData.items || []);
    } catch (error) {
      console.error('Erro ao buscar o carrinho:', error);
    }
  };

  const sortedProducts = [...produtos].sort((a, b) => {
    if (sortOption === 'price_asc') return a.preco - b.preco;
    if (sortOption === 'price_desc') return b.preco - a.preco;
    return 0;
  });

  const filteredProducts = sortedProducts.filter(
    (produto) => produto.preco <= maxPrice
  );

  const renderStars = (rating) => {
    const validRating = Math.min(Math.max(rating, 0), 5); // Garante que o rating esteja entre 0 e 5
    return Array.from({ length: 5 }).map((_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < validRating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };
  
  return (
    <div className="container mx-auto mt-20 mb-10">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 bg-white p-4 shadow-lg rounded-lg">
          <h1 className="text-lg font-bold mb-2 text-black">Ordenar Por</h1>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="block w-full bg-white border border-gray-300 hover:border-gray-500 px-3 py-2 rounded shadow text-sm"
          >
            <option value="relevancy">Mais relevantes</option>
            <option value="price_asc">Preço - Baixo para Alto</option>
            <option value="price_desc">Preço - Alto para Baixo</option>
          </select>

          <h2 className="text-xl font-bold text-gray-800 my-4">Filtros</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Preços</h3>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full accent-green-500"
            />
            <p className="text-gray-600 mt-1">Até R$ {maxPrice}</p>
          </div>
        </div>

        <div className="col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((produto) => (
              <div key={produto.id} className="bg-white p-2 shadow-md rounded-lg">
                <div className="w-full h-40 overflow-hidden">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <Link to={`/products/details/${produto.id}`}>
                  <span className="text-lg font-semibold mt-2 block">{produto.nome}</span>
                </Link>
                <p className="text-gray-600">Preço: R$ {produto.preco.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => toggleFavorite(produto)}
                    className={`ml-3 ${favorites.includes(produto.id) ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    <i className="fas fa-heart" />
                  </button>
                  <button
                    onClick={() => handleAddToCart(produto)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <i className="fas fa-cart-plus" />
                  </button>
                </div>
                <div className="flex items-center mt-2">
                  {renderStars(produto.rating)} {/* Chama renderStars passando o rating */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Nenhum produto encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Man;
