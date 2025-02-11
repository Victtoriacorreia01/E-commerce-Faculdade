import React from 'react';
import { Link } from 'react-router-dom'; 
import fotoprincipal from '../../../assets/baixados (55).jpg'; 
import imgMulherSport from '../../../assets/mulhersport.jpg';
import imgHomemBranco from '../../../assets/homembranco.jpg';
import imgWomandress from '../../../assets/mulherbranco.jpg'
import imgSportWoman from '../../../assets/sportwoman.jpg';
import imgTshirtButton from '../../../assets/tshirtbutton.jpg';
import imgVans from '../../../assets/vans.jpg';
import imgTshirtPink from '../../../assets/tshirtpink.jpg';
import imgBagBlack from '../../../assets/bagblack.jpg';
import imgBlackDress from '../../../assets/blackdress.jpg';
import imgBrownTshirt from '../../../assets/browntshirt.jpg';
import imgJeans from '../../../assets/jeans.jpg';
import imgBlackBoots from '../../../assets/blackboots.jpg';
import imgGreenShoes from '../../../assets/greenshoes.jpg';
import imgBlackShort from '../../../assets/blackshort.jpg';
import imgDressSclack from '../../../assets/dresssclack.jpg';
import imgSummerFashion from '../../../assets/summer fashion.jpg';
import imgAcessorios from '../../../assets/acessorios.jpg';
import imgGymm from '../../../assets/gymm.jpg';
import '../../../tailwind.css'; 
import '../styles/home.css';
import 'animate.css';


const saleItems = [
  { id: 1, link: '/man/men', img: imgHomemBranco, subtitle: 'Men', title: 'sale 40% off' },
  { id: 3, link: '/fem/female', img: imgWomandress, subtitle: 'Woman', title: 'sale 20% off' },
  { id: 2, link: '/sport/sport', img: imgMulherSport, subtitle: 'Sport', title: 'sale 25% off' }
];

const mustHaveItems = [
  { id: 1, link: '', img: imgSportWoman, title: 'Gym Clothing Set', oldPrice: 'R$120,00', newPrice: 'R$99,90' },
  { id: 2, link: '', img: imgTshirtButton, title: 'T-shirt with buttons', oldPrice: 'R$60,00', newPrice: 'R$45,00' },
  { id: 3, link: '', img: imgVans, title: 'Pair of high shoes', oldPrice: 'R$150,00', newPrice: 'R$80,00' },
  { id: 4, link: '', img: imgTshirtPink, title: 'Pink T-shirt', oldPrice: 'R$80,00', newPrice: 'R$65,00' },
  { id: 5, link: '', img: imgBagBlack, title: 'Black bag', oldPrice: 'R$100,00', newPrice: 'R$84,00' },
  { id: 6, link: '', img: imgBlackDress, title: 'Black dress', oldPrice: 'R$200,00', newPrice: 'R$150,00' },
  { id: 7, link: '', img: imgBrownTshirt, title: 'Brown T-shirt', oldPrice: 'R$80,00', newPrice: 'R$64,00' },
  { id: 8, link: '', img: imgJeans, title: 'Simple Jeans', oldPrice: 'R$180,00', newPrice: 'R$120,00' },
  { id: 9, link: '', img: imgBlackBoots, title: 'Black Boots', oldPrice: 'R$199,90', newPrice: 'R$100,00' },
  { id: 10, link: '', img: imgGreenShoes, title: 'Set of shorts', oldPrice: 'R$250,00', newPrice: 'R$120,00' },
  { id: 11, link: '', img: imgBlackShort, title: 'Black short', oldPrice: 'R$60,00', newPrice: 'R$38,00' },
  { id: 12, link: '', img: imgDressSclack, title: 'Black dress with sleeves', oldPrice: 'R$205,00', newPrice: 'R$167,00' },
];

const reviews = [
  { id: 1, name: 'Lara Silva', text: 'Simplemente incrível todas as peças que comprei!', rating: 5 },
  { id: 2, name: 'André Oliveira', text: 'É a segunda compra que faço para minha filha e as peças são de ótima qualidade!', rating: 4 },
  { id: 3, name: 'Alice Lourem', text: 'Atendimento Online perfeito e peças de ótima qualidade!', rating: 4 },
];

const blogPosts = [
  { id: 1, title: 'lorem lorem lorem', excerpt: 'lorem', img: imgSummerFashion, link: '' },
  { id: 2, title: 'lorem lorem lorem', excerpt: 'lorem ', img: imgAcessorios, link: '' },
  { id: 3, title: 'lorem lorem lorem', excerpt: 'lorem ', img: imgGymm, link: '/blog/essential-accessories-for-every-outfit' },
];

export default function Home() {
  return (
    <div>
      <section className="py-20 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          <div className="text-center md:text-left animate__animated animate__fadeInLeft mb-28">
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
            <img src={fotoprincipal} alt="Spring Sale" className="imgprinc rounded-lg animate__animated animate__zoomIn animate__delay-3s" />
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="container mx-auto flex flex-col items-center ">
          <h2 className="text-black text-3xl text-center mb-12 font-semibold">On Sale</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 justify-center items-center">
            {saleItems.map(item => (
              <div key={item.id} className="relative overflow-hidden shadow-lg rounded transition duration-300 transform hover:scale-105 h-96 w-60">
                <Link to={item.link} className="block overflow-hidden h-full">
                  <img src={item.img} alt={item.subtitle} className="w-full h-full object-cover transition-opacity duration-300 transform hover:scale-110" />
                </Link>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center">
                    <p className="text-gray-200 text-sm">{item.subtitle}</p>
                    <h4 className="text-white text-xl font-semibold mt-2">Sale {item.title.split(' ')[1]} off</h4>
                    <Link to={item.link} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-white hover:text-red-500 transition duration-300">
                      Shop Now
                    </Link>
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
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-500 line-through">{item.oldPrice}</span>
                        <span className="text-red-500 font-bold">{item.newPrice}</span>
                      </div>
                    </div>
                  </div>
                </a>
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
              <div key={review.id} className="w-full md:w-1/4 px-4 mb-8">
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-black">{review.name}</h3>
                  <div className="flex items-center mt-2">
                      {[...Array(review.rating)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  <p className="text-gray-700 mt-2">{review.text}</p>
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
              <div key={post.id} className="w-full md:w-1/4 px-4 mb-8">
                <Link to={post.link}>
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src={post.img} alt={post.title} className="w-full h-98 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-black">{post.title}</h3>
                      <p className="text-gray-500 mt-2">{post.excerpt}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
