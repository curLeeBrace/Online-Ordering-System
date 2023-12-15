import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getCookie } from '../../customHooks/cookiesHandler';
import { useNavigate } from 'react-router-dom';
import { UilLocationPinAlt } from '@iconscout/react-unicons'


const ck_forE_verification = "verification-forEmail";


function HomePage() {
  const navigate = useNavigate();
  
  //check verificaiton cookie if available... if true proceed to verification Page
  /*
  useEffect(()=>{
    const emailVerification = getCookie(ck_forE_verification);

    if(emailVerification){
      navigate('/verification');
    }

    if(getCookie("userType") !== "customer" && getCookie("userType") !== null){
      navigate('/login', {replace:true});
    }

   

  },[])
  */

 

  return (
    <div className='lg:h-screen lg:w-100 h-100 bg-gray-200'>

    <div className=" mx-auto pt-8 ml-10 md:ml-28 sm:ml-10 mr-6 sm:px-0 md:pt-28">
        <h1 className="text-3xl font-semibold text-gray-800 md:whitespace-nowrap whitespace-normal">Welcome to Our Online Milk Tea Shop</h1>
        <h2 className="text-lg text-gray-600 mt-4">Satisfy your cravings with our delightful selection of milk teas!</h2>
        
        <div className="inline-flex items-center">
    <UilLocationPinAlt size={28} className="text-l mt-3 text-gray-600" />
    <p className="text-l text-gray-600 ml-2 mt-4">We are located at Pagsanjan, Laguna</p>
   
  </div>

  <br></br>
        <button className="w-42 bg-lime-800 shadow-4xl sm:text-sm text-white relative p-4 md:text-3xl md:hover:scale-110 rounded-3xl mt-4 hover:bg-white transition duration-300 bg-amber-950 isolation-auto z-10 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-amber-950 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 ">
                   <Link to="/menu">Order Now</Link>
                   </button>
                   <div className='col-span-1 h-100 flex justify-center items-center group'>
                   
                    <img src="../img/logo/milkte.png" alt="Milk Tea Logo" className="animate-spin-slow  mx-auto sm:mr-10  mt-20 md:h-96 md:w-full object-contain lg:ml-96 lg:-mr-70 lg:mr-48 lg:-pr-96 lg:-mt-60 lg:pl-96" />
                   
                   
                   
                   </div>
                   
                  
                   
      </div>
      
    </div>

  )
}

export default HomePage