import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // You can add your login logic here, e.g., make an API request to authenticate.

    console.log("User: " + user);
    console.log("Password: " + password);
  };

  return (
    <div className="flex items-center justify-center h-min bg-gray-200">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
      <img src="./img/milktealogo.png" alt="" className=" flex items-center justify-center" />
        <h2 className="text-2xl font-bold mb-4 text-center">LogIn</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="user" className="block text-gray-700 text-sm font-semibold">
              Email:
            </label>
            <input
              type="text"
              id="user"
              className="w-full p-2 border rounded"
              placeholder="Username"
              value={user}
              onChange={(e) => setUser  (e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded mb-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-center text-gray-500 -ml-48 md:-ml-14 mb-8">
            <Link to="/forgot-pass" className=" md:-ml-36 sm:ml-20 text-blue-500 hover:underline">Forgot Password?</Link>
            </p>
            <p className="ml-1 ">
          Don't have an account? <Link to="/registration" className="ml-0 text-blue-500 hover:underline">Register</Link> 
          </p>
        
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full bg-lime-900 text-white p-2 rounded hover:bg-amber-950 transition duration-300">
              Log In
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
}

export default Login;
