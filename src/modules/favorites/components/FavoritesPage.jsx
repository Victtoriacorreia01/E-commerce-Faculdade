import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar
import { getFavorites, removeFromFavorites } from '../services/FavoriteService';
import { addToCart } from '../../cart/services/CartService'; // Importar a função para adicionar ao carrinho

const FavoritesPage = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const navigate = useNavigate(); // Inicializar o hook para navegação

  // Carregar produtos favoritos ao montar o componente
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavorites();
        setFavoriteProducts(
          favorites.map((produto) => ({
            id: produto.id,
            name: produto.name,
            price: produto.price,
            imageUrl: produto.imageUrl,
          }))
        );
      } catch (error) {
        console.error('Erro ao carregar produtos favoritos:', error);
      }
    };
    fetchFavorites();
  }, []);

  // Remover produto dos favoritos
  const handleRemoveFavorite = async (produtoId) => {
    try {
      await removeFromFavorites(produtoId);
    
      const updatedFavorites = favoriteProducts.filter((produto) => produto.id !== produtoId);
    
      setFavoriteProducts(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      window.dispatchEvent(new Event('storage')); 
    } catch (error) {
      console.error(error);
    }
  };
  
  
  

  // Adicionar produto ao carrinho e redirecionar
  const handleAddToCart = async (productId) => {
    try {
      // Enviar o productId para o carrinho
      await addToCart(productId);
      console.log(`Produto ${productId} adicionado ao carrinho.`);

      // Redirecionar para a página de carrinho
      navigate('/cart/cart');
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
    }
  };

  return (
    <div className="container mx-auto mt-20 mb-10">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Meus Favoritos</h1>
      <div className="grid grid-cols-4 gap-4">
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map((produto) => (
            <div key={produto.id} className="bg-white p-4 shadow-md rounded-lg">
              <img
                src={`http://localhost:8080/${produto.imageUrl}`}
                alt={produto.name}
                className="w-full h-40 object-contain"
              />
              <h2 className="text-lg font-semibold">{produto.name}</h2>
              <p>Preço: R$ {produto.price.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveFavorite(produto.id)}
                >
                  <i className="fas fa-heart-broken" /> {/* Ícone de remover */}
                </button>
                <button
                  className="text-green-500 hover:text-green-700 ml-2"
                  onClick={() => handleAddToCart(produto.id)} // Passa o ID do produto
                >
                  <i className="fas fa-cart-plus" /> {/* Ícone de adicionar ao carrinho */}
                </button>
              </div>
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
