import React, { useState, useEffect } from 'react';
import useCart from '../../../hooks/use-cart';
import { getFavorites, addToFavorites, removeFromFavorites } from '../services/FavoriteService'; 

const FavoritesPage = () => {
  const { addProductIntoCart } = useCart();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavorites();
        setFavoriteProducts(favorites.map(produto => ({
          id: produto.id,
          name: produto.name,
          price: produto.price,
          imageUrl: produto.imageUrl
        })));
      } catch (error) {
        console.error('Erro ao carregar produtos favoritos:', error);
      }
    };
    
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (produtoId) => {
    try {
      await removeFromFavorites(produtoId);
      setFavoriteProducts(prev => prev.filter(produto => produto.id !== produtoId));
    } catch (error) {
      console.error('Erro ao remover produto dos favoritos:', error);
    }
  };

  return (
    <div className="container mx-auto mt-20 mb-10">
      <h1 className="text-2xl font-bold mb-4">Meus Favoritos</h1>
      <div className="grid grid-cols-4 gap-4">
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map(produto => (
            <div key={produto.id} className="bg-white p-4 shadow-md rounded-lg">
              <img src={`http://localhost:8080/${produto.imageUrl}`} alt={produto.name} className="w-full h-40 object-contain" />
              <h2 className="text-lg font-semibold">{produto.name}</h2>
              <p>Preço: R$ {produto.price.toFixed(2)}</p>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveFavorite(produto.id)}
              >
                Remover dos Favoritos
              </button>
              <button
                className="text-green-500 hover:text-green-700 ml-2"
                onClick={() => addProductIntoCart(produto)}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Nenhum produto favorito encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
