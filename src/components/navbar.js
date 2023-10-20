import React from 'react';


function Navbar() {
  return (
    <nav className="bg-amber-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <img src="./img/milktealogo.png" alt="" className="h-20 lg:h-12 md:h-30 sm:h-8" />
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
          <li><a href="#" className=" text-white hover:text-orange-200 transition-colors ">Home</a></li>
          <li><a href="#" className="text-white hover:text-orange-200 transition-colors ">Menu</a></li>
          <li><a href="#" className="text-white hover:text-orange-200 transition-colors hover:scale-100">About</a></li>
          <li><a href="#" className="text-white hover:text-orange-200 transition-colors scale-100">Contact</a></li>
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
