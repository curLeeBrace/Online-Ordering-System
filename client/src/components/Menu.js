import React from 'react'
import MilkTeaProduct from './MilkTeaProduct'
import Navbar from './Navbar'

function Menu() {
  return (
   <div className='h-full bg-gray-200'>
   <Navbar />
   <p className='font-poppins text-3xl ml-16 mt-2 text-amber-900'>Menu</p>
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