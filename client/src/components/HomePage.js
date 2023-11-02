import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';
import { UilLocationPinAlt } from '@iconscout/react-unicons'

function HomePage() {
  return (
    <div className='h-screen w-screen bg-gray-200'>
    <Navbar />
    <div className=" mt-8 ml-10 md:ml-20 sm:ml-10 mr-6 sm:px-0 md:mt-28">
        <h1 className="text-3xl font-semibold text-gray-800 whitespace-normal">Welcome to<br></br> Our Online Milk Tea Shop</h1>
        <h2 className="text-lg text-gray-600 mt-4">Satisfy your cravings with our delightful selection of milk teas!</h2>
        
        <div className="inline-flex items-center">
    <UilLocationPinAlt size={28} className="text-l mt-3 text-gray-600" />
    <p className="text-l text-gray-600 ml-2 mt-4">We are located at Pagsanjan, Laguna</p>
   
  </div>

  <br></br>
        <button className="w-42 bg-lime-800 sm:text-sm text-white p-4 md:text-3xl md:hover:scale-110 rounded-3xl mt-4 hover:bg-amber-950 transition duration-300 ">
                   <Link to="/menu">Order Now</Link>
                   </button>
                   <div className='col-span-1 h-100 flex justify-center items-center group'>
                   
                    <img src="./img/milkte.png" alt="Milk Tea Logo" className="animate-spin-slow -mb-44 sm:mr-10 mt-20 md:h-96 md:w-full md:ml-96 md:-mr-70 md:-pr-96 md:-mt-60 md:pl-96" />
                   
                   
                   </div>
                   
                  
                   
      </div>
      

      
    </div>

  )
}

export default HomePage