import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const mockProduct = {
      name: "Example Product",
      images: [
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300/ff7f7f",
        "https://via.placeholder.com/300/ffcc7f",
        "https://via.placeholder.com/300/7fff7f",
      ],
      price: 40.90,
      description: "This is a sample product with fictional details. It has amazing features and will surprise you!",
      sizes: ["XS (PP)", "S (P)", "M", "L (G)", "XL (GG)"],
    };

    const fetchProduct = () => {
      setTimeout(() => {
        setProduct(mockProduct);
      }, 1000);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen bg-gray-100 p-4">
      {/* Image Section */}
      <div className="mt-16 md:w-1/2 mb-4 md:mb-0 flex flex-col items-center">
        <img 
          className="w-full h-96 object-cover rounded-lg mb-4" 
          src={product.images[0]} 
          alt={product.name} 
        />
        <div className="flex space-x-2 overflow-x-auto">
          {product.images.map((image, index) => (
            <img
              key={index}
              className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-75"
              src={image}
              alt={`Image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Product Information Section */}
      <div className="mt-16 md:w-1/2 md:pl-6 flex flex-col justify-start">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
        <p className="text-lg text-gray-700 mb-4">
          Price: <span className="text-green-600 font-semibold">R$ {product.price.toFixed(2)}</span>
        </p>
        <p className="text-gray-600 mb-6">{product.description}</p>

        <label className="block text-gray-700 mb-2">Size:</label>
        <select className="border rounded-md p-2 w-full mb-4">
          {product.sizes.map((size, index) => (
            <option key={index} value={size}>{size}</option>
          ))}
        </select>

        <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
