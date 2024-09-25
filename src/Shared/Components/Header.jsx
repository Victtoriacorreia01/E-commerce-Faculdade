import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <div>
          <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition">
            Meu Site
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
