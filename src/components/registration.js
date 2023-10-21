import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Registration() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  function togglePasswordVisibility2() {
    setIsPasswordVisible2((prevState) => !prevState);
  }
 
    return (
        <div className="bg-gray-100 p-6">
          <div className="max-w-md mx-auto bg-white p-8 rounded shadow-lg text-sm">
            <h2 className="text-2xl font-semibold text-center mb-6">Create An Account</h2>
            <form>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                  required
                />
                
               
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                  required
                />
              </div>
    
              <div className="mb-4">
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                  required
                />
              </div>


              <div className="mb-4">
                <label htmlFor="municipality" className="block text-sm font-medium text-gray-700">Municipality</label>
                <input
                  type="text"
                  id="municipality"
                  name="municipality"
                  className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                  placeholder="E.g., Magdalena"
                  required
                />
          
                </div>
                <div className='mb-4 text-sm '>
                
                <label htmlFor="municipality" className="block text-sm font-medium text-gray-700">Brgy</label>
                <input
                  type="text"
                  id="municipality"
                  name="municipality"
                  className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                  placeholder="E.g., Duhat"
                  required
                />
                <label htmlFor="municipality" className="block text-sm font-medium text-gray-700 ">Street & House#</label>
                <input
                  type="text"
                  id="municipality"
                  name="municipality"
                  className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                  placeholder="E.g., Sitio San Miguel 04-067"
                  required
                />
                </div>
                
              
    
              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  className="mt-1 p-2 w-full border  border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                  required
                />
                <button
        className="absolute mt-6 inset-y-0 right-0 flex items-center text-gray-600"
        onClick={togglePasswordVisibility}
      >
        {isPasswordVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        )}
      </button>
              </div>
    
              <div className="mb-4 relative">
                <label htmlFor="confirm_pass" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type={isPasswordVisible2 ? "text" : "password"}
                  id="confirm_pass"
                  name="confirm_pass"
                  className="mt-1 p-2 w-full border  border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                  required
                />
                <button
        className="absolute mt-6 inset-y-0 right-0 flex items-center text-gray-600"
        onClick={togglePasswordVisibility2}
      >
        {isPasswordVisible2 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        )}
      </button>
              </div>

              
    
              <div className="mb-4">
                <button type="submit" className="w-full bg-lime-800 text-white p-3 rounded hover:bg-amber-950 transition duration-300">
                  Register
                </button>
                
              </div>
            </form>
            <p className="text-center text-gray-500 ml-6">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">LogIn</Link>
        </p>
          </div>
        </div>
      );
}

export default Registration;