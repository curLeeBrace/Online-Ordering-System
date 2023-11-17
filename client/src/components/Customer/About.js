import React from 'react'

import { UilFacebook, UilLocationPinAlt } from '@iconscout/react-unicons'

function About() {
  return (
    <div className='lg:h-screen lg:w-screen sm:w-100 h-100 md:h-screen bg-gray-200'>

    <div className=" mt-8 ml-10 md:ml-20 sm:ml-10 mr-6 sm:px-0 md:mt-28">
        <h1 className="text-3xl font-semibold text-gray-800 whitespace-normal">Welcome to Our Online Milk Tea Shop</h1>
        
        <h2 className="text-l text-gray-600 mt-4 whitespace-normal mr-10 mb-4">Welcome to Fortea, your destination for delightful milk tea creations. <br></br> We're passionate about serving you the best in every cup.</h2>
        <h2 className="text-sm text-gray-600 mt-4 mb-4 font-semibold">About Fortea</h2>
        <div className="flex items-center mb-4">
    <UilLocationPinAlt size={28} className="mr-1" />
    <p className="text-sm text-gray-600 whitespace-normal mr-10 mb-0 ">We are located at Pagsanjan, Laguna</p>
  </div>

  <div className="flex items-center mb-4">
    <UilFacebook size={28} className="text-blue-600 mr-1" />
    <p className="text-sm text-gray-600 whitespace-normal mb-0">Fortea Milktea Shop</p>
  </div>

  <div className='col-span-1 h-100 flex justify-center items-center group rounded-tl-lg rounded-tr-lg'>
    <img src="./img/location.png" alt="" className="lg:h-96 lg:w-100 lg:ml-72 md:ml-80 md:w-100 object-contain rounded-2xl lg:-mr-24 mb-2 md:h-64 md:-mt-60 md:pl-60 " />
</div>

      </div>
    </div>

  )
}

export default About