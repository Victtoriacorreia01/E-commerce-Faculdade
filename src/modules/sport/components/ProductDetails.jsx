import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    const mockProduto = {
      nome: "Produto Exemplo",
      imagens: [
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300/ff7f7f",
        "https://via.placeholder.com/300/ffcc7f",
        "https://via.placeholder.com/300/7fff7f",
      ],
      preco: 40.90,
      info: "Este é um produto de exemplo com detalhes fictícios. Ele tem características incríveis e vai surpreender você!",
      tamanhos: ["PP (XS)", "P (S)", "M (M)", "G (L)", "GG (XL)"],
    };

    const fetchProduct = () => {
      setTimeout(() => {
        setProduto(mockProduto);
      }, 1000);
    };

    fetchProduct();
  }, [id]);

  if (!produto) {
    return <div className="text-center mt-10 text-xl">Carregando...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen bg-gray-100 p-4">
      {/* Seção de Imagens */}
      <div className=" mt-16 md:w-1/2 mb-4 md:mb-0 flex flex-col items-center">
        <img 
          className="w-full h-96 object-cover rounded-lg mb-4" 
          src={produto.imagens[0]} 
          alt={produto.nome} 
        />
        <div className="flex space-x-2 overflow-x-auto">
          {produto.imagens.map((imagem, index) => (
            <img
              key={index}
              className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-75"
              src={imagem}
              alt={`Imagem ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Seção de Informações do Produto */}
      <div className=" mt-16 md:w-1/2 md:pl-6 flex flex-col justify-start">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{produto.nome}</h1>
        <p className="text-lg text-gray-700 mb-4">
          Preço: <span className="text-green-600 font-semibold">R$ {produto.preco.toFixed(2)}</span>
        </p>
        <p className="text-gray-600 mb-6">{produto.info}</p>

        <label className="block text-gray-700 mb-2">Tamanho:</label>
        <select className="border rounded-md p-2 w-full mb-4">
          {produto.tamanhos.map((tamanho, index) => (
            <option key={index} value={tamanho}>{tamanho}</option>
          ))}
        </select>

        <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200">
          ADICIONAR AO CARRINHO
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
