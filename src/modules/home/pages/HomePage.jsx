import React from 'react';
import fotoprincipal from '../../../assets/baixados (55).jpg'; 
import '../../../tailwind.css'; 

const saleItems = [
  { id: 1, link: '', img: '../../../../src/assets/meninonegro.jpg', subtitle: 'man', title: 'sale 40% off' },
  { id: 2, link: '', img: '../../../../src/assets/mulhersport.jpg', subtitle: 'sport', title: 'sale 25% off' },
  { id: 3, link: '', img: '../../../../src/assets/homembranco.jpg', subtitle: 'man', title: 'sale 20% off' },
];

const mustHaveItems = [
  { id: 1, link: '', img: '../../../../src/assets/sportwoman.jpg', title: 'Gym Clothing Set', oldPrice: 'R$120,00', newPrice: 'R$99,90' },
  { id: 2, link: '', img: '../../../../src/assets/tshirtbutton.jpg', title: 'T-shirt with buttons', oldPrice: 'R$60,00', newPrice: 'R$45,00' },
  { id: 3, link: '', img: '../../../../src/assets/vans.jpg', title: 'Pair of high shoes', oldPrice: 'R$150,00', newPrice: 'R$80,00' },
  { id: 4, link: '', img: '../../../../src/assets/tshirtpink.jpg', title: 'Pink T-shirt', oldPrice: 'R$80,00', newPrice: 'R$65,00' },
  { id: 5, link: '', img: '../../../../src/assets/bagblack.jpg', title: 'Black bag', oldPrice: 'R$100,00', newPrice: 'R$84,00' },
  { id: 6, link: '', img: '../../../../src/assets/blackdress.jpg', title: 'Black dress', oldPrice: 'R$200,00', newPrice: 'R$150,00' },
  { id: 7, link: '', img: '../../../../src/assets/browntshirt.jpg', title: 'Brown T-shirt', oldPrice: 'R$80,00', newPrice: 'R$64,00' },
  { id: 8, link: '', img: '../../../../src/assets/jeans.jpg', title: 'Simple Jeans', oldPrice: 'R$180,00', newPrice: 'R$120,00' },
  { id: 9, link: '', img: '../../../../src/assets/blackboots.jpg', title: 'Black Boots', oldPrice: 'R$199,90', newPrice: 'R$100,00' },
  { id: 10, link: '', img: '../../../../src/assets/greenshoes.jpg', title: 'Set of shorts', oldPrice: 'R$250,00', newPrice: 'R$120,00' },
  { id: 11, link: '', img: '../../../../src/assets/blackshort.jpg', title: 'Black short', oldPrice: 'R$60,00', newPrice: 'R$38,00' },
  { id: 12, link: '', img: '../../../../src/assets/dresssclack.jpg', title: 'Black dress with sleeves', oldPrice: 'R$205,00', newPrice: 'R$167,00' },
];

const reviews = [
  { id: 1, name: 'Lara Silva', text: 'lorem lorem lorem.', rating: 5 },
  { id: 2, name: 'André Oliveira', text: 'lorem lorem lorem.', rating: 4 },
  { id: 3, name: 'Alice Lourem', text: 'lorem lorem lorem.', rating: 4 },
];

const blogPosts = [
  { id: 1, title: 'lorem lorem lorem', excerpt: 'lorem', img: '../../../../src/assets/summer fashion.jpg', link: '' },
  { id: 2, title: 'lorem lorem lorem', excerpt: 'lorem ', img: '../../../../src/assets/acessorios.jpg', link: '' },
  { id: 3, title: 'lorem lorem lorem', excerpt: 'lorem ', img: '../../../../src/assets/gymm.jpg', link: '/blog/essential-accessories-for-every-outfit' },
];

export default function Home() {
  return (
    <div>
      <header className="py-20 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          <div className="text-center md:text-left animate__animated animate__fadeInLeft">
            <p className="text-red-700 font-semibold mb-2 animate__animated animate__bounceInLeft animate__delay-1s">
              EXTRA 55% OFF IN SPRING SALE
            </p>
            <h1 className="text-black text-4xl font-light mb-8 animate__animated animate__fadeInLeft animate__delay-2s">
              Discover & Shop<br />Don't miss this opportunity
            </h1>
            <button className="px-8 py-2 bg-red-500 text-white rounded animate__animated animate__pulse animate__infinite">
              SHOP NOW
            </button>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0 animate__animated animate__fadeInRight">
            <img src={fotoprincipal} alt="Spring Sale" className="rounded-lg animate__animated animate__zoomIn animate__delay-3s" />
          </div>
        </div>
      </header>

      <section className="bg-white py-20">
        <div className="container mx-auto flex flex-col items-center">
          <h2 className="text-black text-3xl text-center mb-12 font-semibold">On Sale</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 justify-center items-center">
            {saleItems.map(item => (
              <div key={item.id} className="relative overflow-hidden shadow-lg rounded transition duration-300 transform hover:scale-105 h-96 w-60">
                <a href={item.link} className="block overflow-hidden h-full">
                  <img src={item.img} alt={item.subtitle} className="w-full h-full object-cover transition-opacity duration-300 transform hover:scale-110" />
                </a>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center">
                    <p className="text-gray-200 text-sm">{item.subtitle}</p>
                    <h4 className="text-black text-xl font-semibold mt-2">Sale {item.title.split(' ')[1]} off</h4>
                    <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-white hover:text-red-500 transition duration-300">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="container mx-auto">
          <h2 className="text-black text-3xl text-center mb-12 font-semibold">Must Have</h2>
          <div className="flex flex-wrap justify-center">
            {mustHaveItems.map(item => (
              <div key={item.id} className="w-full md:w-1/4 px-4 mb-8 transform transition duration-500 hover:scale-105">
                <a href={item.link}>
                  <div className="relative">
                    <img src={item.img} className="w-full h-64 object-cover transition duration-500 ease-in-out transform hover:scale-110" alt={item.title} />
                  </div>
                </a>
                <h4 className="text-black text-lg font-semibold mt-4">{item.title}</h4>
                <p className="text-gray-600">
                  <del>{item.oldPrice}</del> <span className="font-semibold text-red-500">{item.newPrice}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto">
          <h2 className="text-black text-3xl text-center mb-12 font-semibold">Customer Reviews</h2>
          <div className="flex flex-wrap justify-center">
            {reviews.map(review => (
              <div key={review.id} className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
                  <h3 className="text-black text-xl font-semibold mb-4">{review.name}</h3>
                  <p className="text-gray-700 mb-4">{review.text}</p>
                  <div className="flex items-center">
                    {Array.from({ length: review.rating }, (_, index) => (
                      <svg key={index} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 15.27L16.18 20 14.54 13.97 20 9.24 13.81 8.63 10 2 6.19 8.63 0 9.24 5.46 13.97 3.82 20z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="container mx-auto">
          <h2 className="text-black text-3xl text-center mb-12 font-semibold">Latest Blog Posts</h2>
          <div className="flex flex-wrap justify-center">
            {blogPosts.map(post => (
              <div key={post.id} className="w-full md:w-1/3 px-4 mb-8">
                <a href={post.link}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 transform hover:scale-105">
                    <img src={post.img} alt={post.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-black text-xl font-semibold mb-2">{post.title}</h3>
                      <p className="text-gray-700 mb-4">{post.excerpt}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
