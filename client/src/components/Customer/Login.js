import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { api } from "../../customHooks/configAxios";

import { getCookie, setCookie } from "../../customHooks/cookiesHandler";
import { useNavigate } from "react-router-dom";

import {useAuth} from "../../customHooks/context/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");
  
  const auth = useAuth();
  
  useEffect(()=>{
    if(accessToken !== undefined) {
      // console.log(accessToken);
      login();
    }
 
  }, []);
   

  

  const handleLogin = (e) => {
    e.preventDefault();
    // You can add your login logic here, e.g., make an API request to authenticate.
    login();
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
      const {account, token, userType, verified, email, username} = res.data;
      
      // console.log("Client Name : ", clientName);
      if(account === "valid"){

        if(verified) { // if account is verified
          setCookie("accessToken", token, {SameSite : "Strict"});
          setCookie("userType", userType)
          setCookie("username", username);
          if(userType === "customer") {
            navigate("/", {replace : true});
          } else if(userType === "raider"){
            navigate("/raider", {replace : true});
          }

        } else { // if account is not verified

          alert("account is not verified!");
          setCookie("emailVerification", email);
          navigate("/verification");

        }

        
        //another user type raider or admin...


      } else {
        alert("Invalid Credentials!")
      }
    })
    .catch(err => {alert("Error Occured!"); console.log(err)})
  }

  return (
    <div className="flex items-center justify-center h-screen  bg-gray-200">
      <div className="bg-white p-2 rounded-lg shadow-lg w-96 -mt-20 ml-4 mr-4">
      <img src="./img/logo/milktealogo.png" alt="" className="h-40 mx-auto" />
        <h2 className="text-2xl font-bold mb-4 text-center">LogIn</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4 p-2">
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
          <div className="mb-4 p-2">
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
            <p className="text-center text-gray-500 mx-auto">
            <Link to="/forgot-pass" replace = "true" className="block mt-4 md:mr-36 -ml-40 md:-ml-16  text-blue-500 hover:underline">Forgot Password?</Link> <br></br>
          Don't have an account? <Link to="/registration" state = {{userType : "customer"}} className="text-blue-500 hover:underline">Register</Link> 
         
        </p>
          </div>
          <div className="mb-4">
            <button type="submit" className="w-80 ml-2 md:ml-6 bg-lime-900 text-white p-2 md:hover:scale-110 rounded-xl hover:bg-white transition duration-300 relative bg-amber-950 isolation-auto z-10 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-amber-950 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
              Log In
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
}

export default Login;
