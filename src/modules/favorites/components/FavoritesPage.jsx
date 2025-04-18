import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavorites, removeFromFavorites } from '../services/FavoriteService';
import { addToCart } from '../../cart/services/CartService';

const FavoritesPage = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavorites();
        setFavoriteProducts(
          favorites.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
          }))
        );
      } catch (error) {
        console.error('Error loading favorite products:', error);
      }
    };
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (productId) => {
    try {
      await removeFromFavorites(productId);
      const updatedFavorites = favoriteProducts.filter((product) => product.id !== productId);
      setFavoriteProducts(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      console.log(`Product ${productId} added to cart.`);
      navigate('/cart/cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="container mx-auto mt-20 mb-10">
      <h1 className="text-2xl font-bold mb-4 text-red-500">My Favorites</h1>
      <div className="grid grid-cols-4 gap-4">
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow-md rounded-lg">
              <img
                src={`http://localhost:8080/${product.imageUrl}`}
                alt={product.name}
                className="w-full h-40 object-contain"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p>Price: R$ {product.price.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveFavorite(product.id)}
                >
                  <i className="fas fa-heart-broken" />
                </button>
                <button
                  className="text-green-500 hover:text-green-700 ml-2"
                  onClick={() => handleAddToCart(product.id)}
                >
                  <i className="fas fa-cart-plus" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No favorite products found.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
