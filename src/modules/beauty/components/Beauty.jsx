import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import useCart from '../../../hooks/use-cart';
import { getProductsByCategory } from '../services/BeautyService'; 
import { addToFavorites, removeFromFavorites } from '../../favorites/services/FavoriteService'; 
import { addToCart, getCart, removeFromCart, decrementQuantity, clearCart } from '../../cart/services/CartService';

const Beauty = () => {
  const { addProductIntoCart } = useCart();
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOption, setSortOption] = useState('relevancy');
  const [produtos, setProdutos] = useState([]);

  const handleAddToCart = (product) => {
    addProductIntoCart(product); 
  };

  const fetchCart = async () => {
    try {
      const cartData = await getCart();
      setCart(cartData.items || []);
    } catch (error) {
      console.error('Erro ao carregar o carrinho:', error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      fetchCart();
    } catch (error) {
      console.error('Erro ao remover produto:', error);
    }
  };

  const handleDecrementQuantity = async (productId) => {
    try {
      await decrementQuantity(productId);
      fetchCart();
    } catch (error) {
      console.error('Erro ao diminuir quantidade:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      alert('Carrinho esvaziado!');
      setCart([]);
    } catch (error) {
      console.error('Erro ao esvaziar o carrinho:', error);
    }
  };

  const toggleFavorite = async (produto) => {
    try {
      const isFavorite = favorites.includes(produto.id);
  
      if (isFavorite) {
        await removeFromFavorites(produto.id);
        setFavorites((prev) =>
          prev.filter((id) => id !== produto.id)
        );
      } else {
        await addToFavorites(produto);
        setFavorites((prev) => [...prev, produto.id]);
      }
  
      // Armazena a lista de favoritos no localStorage
      localStorage.setItem('favorites', JSON.stringify([...favorites]));
    } catch (error) {
      console.error('Erro ao atualizar favoritos:', error);
    }
  };
  
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategory();
        setProdutos(
          data.map((produto) => ({
            id: produto.id,
            nome: produto.name,
            preco: produto.price,
            imagem: `http://localhost:8080/${produto.imageUrl}`,
          }))
        );
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = [...produtos].sort((a, b) => {
    if (sortOption === 'price_asc') return a.preco - b.preco;
    if (sortOption === 'price_desc') return b.preco - a.preco;
    return 0;
  });

  const filteredProducts = sortedProducts.filter(
    (produto) => produto.preco <= maxPrice
  );

  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));

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
                  <span className="text-lg font-semibold mt-2 block">
                    {produto.nome}
                  </span>
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
                  {renderStars(4)}
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

export default Beauty;
