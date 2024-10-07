import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails'; 

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

const ProductPage = () => {
  const { id } = useParams();
  const produto = produtos.find((prod) => prod.id === parseInt(id));

  if (!produto) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div>
      <ProductDetails produto={produto} />
    </div>
  );
};

export default ProductPage;
