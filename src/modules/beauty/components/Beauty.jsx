import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importando Link
import '@fortawesome/fontawesome-free/css/all.css';
import useCart from '../../../hooks/use-cart';
import rimel from '../../../assets/rimel.jpg';
import blush from '../../../assets/blush.jpg';
import po from '../../../assets/poo.jpg';
import delineador from '../../../assets/delineadorr.jpg';
import batom from '../../../assets/batomm.jpg';
import gloss from '../../../assets/gloss.jpg';
import hidratantelabial from '../../../assets/hidratantelabial.jpg';
import aguamicelar from '../../../assets/aguamicelar.jpg';
import paleta from '../../../assets/paleta.jpg';

const Beauty = () => {
  const { addProductIntoCart } = useCart();
  const [favorites, setFavorites] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOption, setSortOption] = useState('relevancy');

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

  const toggleFavorite = (produtoId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(produtoId)
        ? prevFavorites.filter((id) => id !== produtoId)
        : [...prevFavorites, produtoId];
      
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const sortedProducts = [...produtos].sort((a, b) => {
    if (sortOption === 'price_asc') return a.preco - b.preco;
    if (sortOption === 'price_desc') return b.preco - a.preco;
    return 0; 
  });

  const filteredProducts = sortedProducts.filter((produto) => produto.preco <= maxPrice);
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i} className={`fas fa-star ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`} />
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto mt-20 mb-10">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 bg-white p-4 shadow-lg rounded-lg">
          <h1 className="text-lg font-bold mb-2">Ordenar Por</h1>
          <select
            name="sort"
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-3 py-2 pr-6 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm"
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
                <div className="w-full h-40 relative overflow-hidden">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="rounded-lg w-full h-full object-contain"
                  />
                </div>
                <Link to={`/beauty/produtos/${produto.id}`}> 
                  <span className="text-lg font-semibold mt-2 block cursor-pointer">{produto.nome}</span>
                </Link>
                <p className="text-gray-600">Preço: R$ {produto.preco.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    className={`ml-3 mr-3 ${favorites.includes(produto.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-800'}`}
                    onClick={() => toggleFavorite(produto.id)}
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => addProductIntoCart(produto)}
                  >
                    <i className="fas fa-cart-plus"></i>
                  </button>
                </div>
                <div className="flex items-center mt-2">
                  {renderStars(4)}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Nenhum produto encontrado dentro do limite de preço.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Beauty;
