import React from 'react';
import { Link } from 'react-router-dom';
import vestido from '../../../assets/estido.jpg';
import salto from '../../../assets/saltoo.jpg';
import colar from '../../../assets/colarver.jpg';
import calca from '../../../assets/calcafem.jpg';
import oculos from '../../../assets/oculoss.jpg';
import saia from '../../../assets/saiafem.jpg';
import chapeu from '../../../assets/chapeu.jpg';
import blusamanga from '../../../assets/blusabranca.jpg';
import papete from '../../../assets/papetee.jpg';
import useCart from '../../../hooks/use-cart';
import { useState } from 'react';

const Female = () => {
  const { addProductIntoCart } = useCart();
  const [favorites, setFavorites] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOption, setSortOption] = useState('relevancy');

  const produtos = [
    { id: 1, nome: "Vestido Floral", preco: 299.99, imagem: vestido },
    { id: 2, nome: "Salto Formal", preco: 109.99, imagem: salto },
    { id: 3, nome: "Colar Prata 925", preco: 89.99, imagem: colar },
    { id: 4, nome: "Calça Alfaiataria", preco: 99.99, imagem: calca },
    { id: 5, nome: "Óculos", preco: 108.99, imagem: oculos },
    { id: 6, nome: "Saia Off White", preco: 89.99, imagem: saia },
    { id: 7, nome: "Chapéu Azul", preco: 39.99, imagem: chapeu },
    { id: 8, nome: "Blusa com Manga", preco: 59.99, imagem: blusamanga },
    { id: 9, nome: "Papete Preta Brilhosa", preco: 75.99, imagem: papete },
  ];

  const toggleFavorite = (produtoId) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(produtoId)
        ? prevFavorites.filter(id => id !== produtoId)
        : [...prevFavorites, produtoId]
    );
  };

  const handleFilterChange = (setter) => (item) => {
    setter(prev => 
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const sortedProducts = [...produtos].sort((a, b) => {
    switch (sortOption) {
      case 'price_asc':
        return a.preco - b.preco;
      case 'price_desc':
        return b.preco - a.preco;
      default:
        return 0; // 'relevancy' ou outra opção
    }
  });

  const filteredProducts = sortedProducts.filter(produto => (
    (selectedBrands.length === 0 || selectedBrands.includes(produto.marca)) &&
    (selectedStyles.length === 0 || selectedStyles.includes(produto.estilo)) &&
    produto.preco <= maxPrice
  ));

  const renderStars = (rating) => (
    Array.from({ length: 5 }, (_, i) => (
      <i key={i} className={`fas fa-star ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
    ))
  );

  return (
    <div className="container mx-auto mt-20 mb-10">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 bg-white p-4 shadow-lg rounded-lg">
          <h1 className="text-lg font-bold mb-2">Ordenar Por</h1>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="block w-full border border-gray-300 rounded"
          >
            <option value="relevancy">Mais relevantes</option>
            <option value="price_asc">Preço - Baixo para Alto</option>
            <option value="price_desc">Preço - Alto para Baixo</option>
          </select>
          <h2 className="text-xl font-bold text-gray-800 my-4">Filtros</h2>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Marcas</h3>
            <div className="flex flex-wrap gap-2">
              {['Nike', 'Ralph Lauren', 'Blueendbarry', 'Calvinklein', 'Schutz', 'Dior', 'Chanel', 'Jonh John', 'swarovski', 'Rolex', 'Forever21', 'Diesel'].map(marca => (
                <button
                  key={marca}
                  className={`py-1 px-3 border rounded-full text-xs ${selectedBrands.includes(marca) ? 'bg-gray-200' : 'text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => handleFilterChange(setSelectedBrands)(marca)}
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
              {['Calçados', 'Vestidos', 'Saias', 'Chapéus', 'Calças', 'Acessórios', 'Joias'].map(estilo => (
                <button
                  key={estilo}
                  className={`py-1 px-3 border rounded-full text-xs ${selectedStyles.includes(estilo) ? 'bg-gray-200' : 'text-gray-600 hover:bg-gray-200'}`}
                  onClick={() => handleFilterChange(setSelectedStyles)(estilo)}
                >
                  {estilo}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
          {filteredProducts.map(produto => (
            <div key={produto.id} className="bg-white p-2 shadow-md rounded-lg">
              <Link to={`/produto/${produto.id}`}>
                <div className="w-full h-40 relative overflow-hidden">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="object-contain w-full h-full"
                />                
                </div>
              </Link>
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

export default Female;
