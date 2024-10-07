
import '@fortawesome/fontawesome-free/css/all.css';
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Importando Link para navegação
import camisa from '../../../assets/blusamasc.jpg';
import calcao from '../../../assets/shortmas.jpg';
import relogio from '../../../assets/relogio.jpg';
import sapato from '../../../assets/sapatomas.jpg';
import gravata from '../../../assets/gravata.jpg';
import calca from '../../../assets/calcamas.jpg';
import cinto from '../../../assets/cinto.jpg';
import blusamangacumprida from '../../../assets/blusacumprida.jpg';
import chinelo from '../../../assets/chinelomas.jpg';
import useCart from '../../../hooks/use-cart';

const Man = () => {
  const { addProductIntoCart } = useCart();
  const [favorites, setFavorites] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOption, setSortOption] = useState('relevancy');

  const produtos = [
    { id: 1, nome: "Camisa Masculina", preco: 299.99, info: "O mais vendido", imagem: camisa, marca: "Nike", estilo: "Camisas", rating: 4 },
    { id: 2, nome: "Short Masculino", preco: 109.99, imagem: calcao, marca: "Adidas", estilo: "Shorts", rating: 3 },
    { id: 3, nome: "Relógio Adidas", preco: 89.99, info: "O melhor!", imagem: relogio, marca: "Adidas", estilo: "Acessorios", rating: 5 },
    { id: 4, nome: "Sapato Mocassim", preco: 99.99, imagem: sapato, marca: "Tommy", estilo: "Calçados", rating: 4 },
    { id: 5, nome: "Gravata", preco: 108.99, imagem: gravata, marca: "Calvinklein", estilo: "Acessorios", rating: 4 },
    { id: 6, nome: "Calça Formal", preco: 89.99, imagem: calca, marca: "Polo", estilo: "Calças", rating: 2 },
    { id: 7, nome: "Cinto Marrom", preco: 39.99, imagem: cinto, marca: "Diesel", estilo: "Acessorios", rating: 5 },
    { id: 8, nome: "Camisa Manga Comprida", preco: 59.99, imagem: blusamangacumprida, marca: "Nike", estilo: "Camisas", rating: 3 },
    { id: 9, nome: "Chinelo", preco: 75.99, imagem: chinelo, marca: "Vans", estilo: "Calçados", rating: 4 },
  ];

  const toggleFavorite = (produtoId) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(produtoId)
        ? prevFavorites.filter(id => id !== produtoId)
        : [...prevFavorites, produtoId]
    );
  };

  const handleBrandFilter = (brand) => {
    setSelectedBrands(prevSelectedBrands =>
      prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter(b => b !== brand)
        : [...prevSelectedBrands, brand]
    );
  };

  const handleStyleFilter = (style) => {
    setSelectedStyles(prevSelectedStyles =>
      prevSelectedStyles.includes(style)
        ? prevSelectedStyles.filter(s => s !== style)
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
      default:
        return b.rating - a.rating;
    }
  });

  const filteredProducts = sortedProducts.filter(produto => {
    return (
      (selectedBrands.length === 0 || selectedBrands.includes(produto.marca)) &&
      (selectedStyles.length === 0 || selectedStyles.includes(produto.estilo)) &&
      produto.preco <= maxPrice
    );
  });

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
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
            className="block w-full bg-white border border-gray-300 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm"
          >
            <option value="relevancy">Mais relevantes</option>
            <option value="price_asc">Preço - Baixo para Alto</option>
            <option value="price_desc">Preço - Alto para Baixo</option>
            <option value="rating_desc">Avaliação - Alta para Baixa</option>
          </select>
          <h2 className="text-xl font-bold text-gray-800 my-4">Filtros</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Marcas</h3>
            <div className="flex flex-wrap gap-2">
              {['Nike', 'Adidas', 'Tommy', 'Calvinklein', 'Vans', 'Polo', 'Diesel'].map(marca => (
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
              {['Calçados', 'Camisas', 'Formal', 'Acessorios', 'Shorts'].map(estilo => (
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
                  <i className="fas fa-shopping-cart"></i>
                </button>
              </div>
              <div className="flex mt-2">
                {Array.from({ length: 5 }, (_, index) => (
                  <i
                    key={index}
                    className={`fas fa-star ${index < produto.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  ></i>
                ))}
              </div>
              {produto.info && <p className="text-xs text-red-500 mt-2">{produto.info}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Man;
