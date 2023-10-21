import React from 'react'
import Navbar from '../components/navbar'
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
    <Navbar />
    <div className="absolute ml-4 mt-8 px-4 sm:px-0">
        <h1 className="text-3xl font-semibold text-gray-800 whitespace-normal">Welcome to<br></br> Our Online Milk Tea Shop</h1>
        <p className="text-lg text-gray-600 mt-4">Satisfy your cravings with our delightful selection of milk teas!</p>
        <button type="submit" className="w-42 bg-lime-800 text-white p-4 rounded mt-4 hover:bg-amber-950 transition duration-300 ">
                   <Link to="/menu">Shop Now</Link>
                   </button>
                   <div className='col-span-1 h-100 flex justify-center items-center group'>
                   <img src="./img/milktealogo.png" alt="Milk Tea Logo" className="absolute z-10 h-4/6 2x l:h-3/6" />
                   </div>
      </div>
    </div>

  )
}

export default HomePage