import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { api } from "../../customHooks/configAxios";

import { getCookie, setCookie } from "../../customHooks/cookiesHandler";
import { useNavigate } from "react-router-dom";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");
  
  
  useEffect(()=>{
    if(accessToken !== undefined) {
      // console.log(accessToken);
      login(accessToken);
    }
 
  }, []);
   

  

  const handleLogin = (e) => {
    e.preventDefault();
    // You can add your login logic here, e.g., make an API request to authenticate.
    login(accessToken);
  }

  //login function
  const login = () => {
   
   api.post('/account/login', { 
      user : {
        email : email,
        password : password
      } 
     
    },
    {
      headers : {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(res => {
      const {account, token, userType, clientName} = res.data;
      
      if(account === "valid"){
        setCookie("accessToken", token, {SameSite : "Strict"});
         //setClientData
        if(userType === "customer") {

          
          navigate("/", {replace : true});
        }
      }
    })
    .catch(err => {alert("Invalid Credentials!"); console.log(err)})
  }

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
              value={email}
              onChange={(e) => setEmail (e.target.value)}
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
            <p className="text-center text-gray-500 -ml-14">
            <Link to="/forgot-pass" className="block mt-4 mr-20 -ml-20 text-blue-500 hover:underline">Forgot Password?</Link> <br></br>
          Don't have an account? <Link to="/registration" state = {{userType : "customer"}} className="text-blue-500 hover:underline">Register</Link> 
         
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
