import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="bg-amber-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <img src="./img/milktealogo.png" alt="" className="h-20 lg:h-12 md:h-8 sm:h-30" />
        <p className="text-white absolute ml-14 text-lg">Fortea</p>
        <div className="lg:hidden">
          {/* Mobile menu button */}
          <button
            className="text-white hover:text-gray-200 focus:outline-none"
            onClick={() => console.log('Toggle mobile menu')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden md:flex space-x-10 mr-10 ">
          <li><Link to="/"className="text-white hover:text-orange-200 transition-colors">Home</Link></li>
          <li><Link to="/"className="text-white hover:text-orange-200 transition-colors">Menu</Link></li>
          <li><Link to="/"className="text-white hover:text-orange-200 transition-colors">About</Link></li>
          <button type="menu" className="w-48 bg-lime-800 text-white rounded hover:bg-amber-950 transition duration-300 whitespace-nowrap">
                   <Link to="/login">LogIn / Register</Link>
                   </button>
          </ul>
      </div>
      {/* Mobile menu */}
      <div className="lg:hidden md:hidden">
        <ul className="bg-amber-950 mt-2 space-y-2">
          <li><a href="#" className="text-white block py-2 px-4">Home</a></li>
          <li><a href="#" className="text-white block py-2 px-4">Menu</a></li>
          <li><a href="#" className="text-white block py-2 px-4">About</a></li>
          <li><a href="#" className="text-white block py-2 px-4">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
