import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails'; 

const produtos = [
  { id: 19, nome: "Blush", preco: 79.99, info: "O mais vendido", imagem: "/assets/blush.jpg" },
  { id: 20, nome: "Batom", preco: 39.99, info: "Cor vibrante", imagem: "/assets/batom.jpg" },
  { id: 21, nome: "Rímel", preco: 89.99, info: "Se sinta linda!", imagem: "/assets/rimel.jpg" },
  { id: 22, nome: "Paleta", preco: 84.99, info: "Para todos os tons", imagem: "/assets/paleta.jpg" },
  { id: 23, nome: "Pó compacto", preco: 109.99, info: "Acabamento perfeito", imagem: "/assets/poo.jpg" },
  { id: 24, nome: "Gloss", preco: 36.99, info: "Brilho intenso", imagem: "/assets/gloss.jpg" },
  { id: 25, nome: "Delineador", preco: 69.99, info: "Olhar marcante", imagem: "/assets/delineadorr.jpg" },
  { id: 26, nome: "Água micelar", preco: 59.99, info: "Limpeza suave", imagem: "/assets/aguamicelar.jpg" },
  { id: 27, nome: "Hidratante labial", preco: 29.99, info: "Hidratação intensa", imagem: "/assets/hidratantelabial.jpg" },
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
