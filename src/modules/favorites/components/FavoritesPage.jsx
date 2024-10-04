import { useState, useEffect } from 'react';
import useCart from '../../../hooks/use-cart';
import blush from '../../../assets/blush.jpg';
import rimel from '../../../assets/rimel.jpg';
import po from '../../../assets/poo.jpg';
import delineador from '../../../assets/delineadorr.jpg';
import batom from '../../../assets/batomm.jpg';
import gloss from '../../../assets/gloss.jpg';
import hidratantelabial from '../../../assets/hidratantelabial.jpg';
import aguamicelar from '../../../assets/aguamicelar.jpg';
import paleta from '../../../assets/paleta.jpg';

const FavoritesPage = () => {
  const { addProductIntoCart } = useCart(); 
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const produtos = [
    { id: 19, nome: "Blush", preco: 79.99, info: "O mais vendido", imagem: blush, categoria: "beleza" },
    { id: 20, nome: "Batom", preco: 39.99, imagem: batom, categoria: "beleza" },
    { id: 21, nome: "Rímel", preco: 89.99, info: "Se sinta linda!", imagem: rimel, categoria: "beleza" },
    { id: 22, nome: "Paleta", preco: 84.99, imagem: paleta, categoria: "beleza" },
    { id: 23, nome: "Pó compacto", preco: 109.99, imagem: po, categoria: "beleza" },
    { id: 24, nome: "Gloss", preco: 36.99, imagem: gloss, categoria: "beleza" },
    { id: 25, nome: "Delineador", preco: 69.99, imagem: delineador, categoria: "beleza" },
    { id: 26, nome: "Água micelar", preco: 59.99, imagem: aguamicelar, categoria: "beleza" },
    { id: 27, nome: "Hidratante labial", preco: 29.99, imagem: hidratantelabial, categoria: "beleza" },
  ];

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteItems = produtos.filter((produto) => storedFavorites.includes(produto.id));
    setFavoriteProducts(favoriteItems);
  }, []);

  const removeFromFavorites = (produtoId) => {
    const updatedFavorites = favoriteProducts.filter((produto) => produto.id !== produtoId);
    setFavoriteProducts(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites.map(p => p.id))); // Atualizar localStorage
  };

  return (
    <div className="container mx-auto mt-20 mb-10">
      <h1 className="text-2xl font-bold mb-6">Meus Favoritos</h1>
      {favoriteProducts.length === 0 ? (
        <p className="text-gray-600">Nenhum produto favoritado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {favoriteProducts.map((produto) => (
            <div key={produto.id} className="bg-white p-2 shadow-md rounded-lg">
              <div className="w-full h-40 relative overflow-hidden">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="rounded-lg w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-semibold mt-2 block">{produto.nome}</span>
              <p className="text-gray-600">Preço: R$ {produto.preco.toFixed(2)}</p>
              
              <div className="flex mt-2 gap-4">
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() => addProductIntoCart(produto)}
                >
                  <i className="fas fa-cart-plus"></i>
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFromFavorites(produto.id)}
                >
                  <i className="fas fa-heart-broken"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
