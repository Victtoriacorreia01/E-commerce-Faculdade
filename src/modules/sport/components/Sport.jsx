import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { Link } from 'react-router-dom'; // Se precisar usar links
import tenis from '../../../assets/tenis.jpg';
import topnike from '../../../assets/topnike.jpg';
import bone from '../../../assets/bonee.jpg';
import bola from '../../../assets/bola.jpg';
import leg from '../../../assets/calca.jpg';
import blusa from '../../../assets/blusaa.jpg';
import meia from '../../../assets/meiabranca.jpg';
import peso from '../../../assets/pesoo.jpg';
import short from '../../../assets/short.jpg';
import useCart from '../../../hooks/use-cart';

const Sport = () => {
  const { addProductIntoCart } = useCart();
  const [favorites, setFavorites] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOption, setSortOption] = useState('relevancy');

  const produtos = [
    { id: 1, nome: "Tênis adidas", preco: 299.99, info: "O mais vendido", imagem: tenis, marca: "Adidas", estilo: "Tênis", rating: 4 },
    { id: 2, nome: "Top nike", preco: 109.99, imagem: topnike, marca: "Nike", estilo: "Roupas", rating: 3 },
    { id: 3, nome: "Boné nike", preco: 89.99, info: "Se sinta linda!", imagem: bone, marca: "Nike", estilo: "Chapéus", rating: 5 },
    { id: 4, nome: "Bola Mikasa", preco: 99.99, imagem: bola, marca: "Mikasa", estilo: "Bolas", rating: 4 },
    { id: 5, nome: "Calça Adidas", preco: 108.99, imagem: leg, marca: "Adidas", estilo: "Roupas", rating: 4 },
    { id: 6, nome: "Blusas nike", preco: 89.99, imagem: blusa, marca: "Nike", estilo: "Roupas", rating: 2 },
    { id: 7, nome: "Meia", preco: 39.99, imagem: meia, marca: "Nike", estilo: "Meias", rating: 5 },
    { id: 8, nome: "Peso rosa", preco: 59.99, imagem: peso, marca: "ERKE", estilo: "Academia", rating: 3 },
    { id: 9, nome: "Short preto", preco: 75.99, imagem: short, marca: "Nike", estilo: "Roupas", rating: 4 },
  ];

  const toggleFavorite = (produtoId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(produtoId)
        ? prevFavorites.filter((id) => id !== produtoId)
        : [...prevFavorites, produtoId]
    );
  };

  const handleBrandFilter = (brand) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter((b) => b !== brand)
        : [...prevSelectedBrands, brand]
    );
  };

  const handleStyleFilter = (style) => {
    setSelectedStyles((prevSelectedStyles) =>
      prevSelectedStyles.includes(style)
        ? prevSelectedStyles.filter((s) => s !== style)
        : [...prevSelectedStyles, style]
    );
  };

  const sortedProducts = [...produtos].sort((a, b) => {
    switch (sortOption) {
      case 'price_asc':
        return a.preco - b.preco;
      case 'price_desc':
        return b.preco - a.preco;
      case 'rating_desc':
        return b.rating - a.rating;
      default:
        return b.rating - a.rating; // relevancy
    }
  });

  const filteredProducts = sortedProducts.filter((produto) => {
    return (
      (selectedBrands.length === 0 || selectedBrands.includes(produto.marca)) &&
      (selectedStyles.length === 0 || selectedStyles.includes(produto.estilo)) &&
      produto.preco <= maxPrice
    );
  });

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="container mx-auto mt-20 mb-10">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 bg-white p-4 shadow-lg rounded-lg">
          <h1 className="text-lg font-bold mb-2">Ordenar Por</h1>
          <div className="relative">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-3 py-2 pr-6 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm"
            >
              <option value="relevancy">Mais relevantes</option>
              <option value="price_asc">Preço - Baixo para Alto</option>
              <option value="price_desc">Preço - Alto para Baixo</option>
              <option value="rating_desc">Avaliação - Alta para Baixa</option>
            </select>
          </div>
          <h2 className="text-xl font-bold text-gray-800 my-4">Filtros</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Marcas</h3>
            <div className="flex flex-wrap gap-2">
              {['Nike', 'Adidas', 'Puma', 'Newbalance', 'Vans', 'NBA', 'Converse', 'ERKE'].map((marca) => (
                <button
                  key={marca}
                  className={`py-1 px-3 border rounded-full text-xs ${selectedBrands.includes(marca) ? 'bg-gray-200' : 'text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => handleBrandFilter(marca)}
                >
                  {marca}
                </button>
              ))}
            </div>
          </div>
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
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Estilos</h3>
            <div className="flex flex-wrap gap-2">
              {['Meias', 'Tênis', 'Roupas', 'Bolas', 'Academia', 'Acessórios', 'Chapéus'].map((estilo) => (
                <button
                  key={estilo}
                  className={`py-1 px-3 border rounded-full text-xs ${selectedStyles.includes(estilo) ? 'bg-gray-200' : 'text-gray-600 hover:bg-gray-200'}`}
                  onClick={() => handleStyleFilter(estilo)}
                >
                  {estilo}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
          {filteredProducts.map((produto) => (
            <div key={produto.id} className="bg-white p-2 shadow-md rounded-lg">
              <div className="w-full h-40 relative overflow-hidden">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="object-contain w-full h-full"
                />
              </div>
              <h2 className="text-lg font-semibold mt-2">{produto.nome}</h2>
              <p className="text-gray-600">Preço: R$ {produto.preco.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <button
                  className={`ml-3 mr-3 ${favorites.includes(produto.id) ? 'text-red-500' : 'text-red-500 hover:text-red-800'}`}
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
                {renderStars(produto.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sport;
