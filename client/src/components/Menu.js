import React from 'react'
import MilkTeaProduct from './MilkTeaProduct'
import Navbar from './Navbar'
import { Link,  } from 'react-router-dom';
import { UilShoppingCartAlt } from '@iconscout/react-unicons'

function Menu() {
  return (
   <div className='h-full bg-gray-200'>
   <Navbar />
   <p className='font-poppins text-3xl md:ml-10 sm:ml-4 mt-2 text-3xl font-semibold text-amber-950 flex justify-center'>Menu</p>
   <div className="lg:flex lg:place-content-end md:flex md:place-content-end md:mr-5 lg:-mt-8 lg:mb-6 md:-mt-6 md: sm:mt-2 flex justify-center ">
   <button         
          className="w-40 md:my-0 mt-2 bg-lime-900 rounded text-white hover:scale-110 rounded-l hover:bg-white transition duration-300 bg-amber-950 isolation-auto border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-amber-950 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
        >
          <Link to="/Orders"><UilShoppingCartAlt className="mr-2 inline-flex whitespace-nowrap" />Your Orders</Link>
        </button>
        </div>

   <div className='flex md:flex-row sm:flex flex-col flex-wrap justify-center items-center'>
  
   <MilkTeaProduct/>
   <MilkTeaProduct/>
   <MilkTeaProduct/>
   <MilkTeaProduct/>
   <MilkTeaProduct/>
   <MilkTeaProduct/>
   <MilkTeaProduct/>
   <MilkTeaProduct/>
   <MilkTeaProduct/>
   <MilkTeaProduct/>
   <MilkTeaProduct/>
   <MilkTeaProduct/>
   
   <MilkTeaProduct/>
   </div>
   </div>
  )
}

export default Menu