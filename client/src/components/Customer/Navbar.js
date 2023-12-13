import React, { useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UilBars, UilMultiply } from '@iconscout/react-unicons';
import { Outlet } from "react-router-dom";
import { UilShoppingCartAlt } from '@iconscout/react-unicons'
import { getCookie , setCookie, removeCookies} from '../../customHooks/cookiesHandler';
import { useNavigate } from 'react-router-dom';

import { api } from '../../customHooks/configAxios';

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(null);
  
  let {pathname} = useLocation()
  let subpage = pathname.split('/')?.[1]

    useEffect(() => {
      
      const accessToken = getCookie("accessToken");
      if (accessToken != null) {
        api
          .get('/client/getUsername', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          })  
          .then(res => {
            const { username} = res.data;

            // setCookie("username", username);
            // setCookie("userType", userType);
            setUsername(getCookie("username"));
          })
          .catch(err => console.log(err));
      }
    }, []);
    

  function link (type = null){
    if(subpage === ''){
      subpage = 'home'
    }
    let classes = 'text-white hover:text-orange-200 mx-4 md:my-0 sm:mb-2 md:hover:scale-150 duration-300'
    

    if(type === subpage){
      classes += ' font-bold md:border-b-4 md:border-orange-200 md:text-orange-200 text-orange-200';
    }
    
    return classes;

  }


  return (
    <>
    <nav className={`p-2 bg-amber-950 shadow md:flex md:items-center md:justify-between`}>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-[Poppins] cursor-pointer font-semibold text-lime-800">
          <img src="./img/logo/morislogo.png" alt="" className="pl-4 h-14 inline" /> Fortea
        </span>
        <span>
          <div className="text-3xl absolute -mt-4 right-8 md:hidden hover:-scale-y-100 duration-300 cursor-pointer">
            {open ? (
              <div>
                <UilMultiply size={32} onClick={()=>setOpen(false)} style={{ color: 'white' }}/>
                
              </div>
            ) : (
              <div>
                <UilBars size={32} onClick={()=>setOpen(true)} style={{ color: 'white' }} />
              </div>
            )}
          </div>
        </span>
      </div>

      <ul
        className={`md:flex md:items-center z-[1] md:z-auto md:static absolute pb-6 bg-amber-950 w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 
        ${open ? 'top-18' : 'left-[-800px]'} transition-all ease-in duration-500`}
      >
        <li className={link('home')}>
          <Link to="/home" >
            Home
          </Link>
        </li>
        <li className={link('menu')}>
          <Link to="/menu" >
            Menu
          </Link>
        </li>
        <li className={link('about')}>
          <Link to="/about" >
            About
          </Link>
        </li>
        <li className={link('orders')}>
          <Link to="/orders" >
          <UilShoppingCartAlt className=" inline-flex whitespace-nowrap" />
          </Link>
        </li>

        {username == null ? (
            <button className="w-28 md:my-0 mt-2 bg-lime-900 rounded text-white md:hover:scale-110 rounded-l hover:bg-white transition duration-300 relative bg-amber-950 isolation-auto z-10 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-900 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
              <Link to="/login">LogIn</Link>
            </button>
          ) : (
            <>
              {username} <br></br>
              <button className="w-28 md:my-0 mt-2 bg-lime-900 rounded text-white md:hover:scale-110 rounded-l hover:bg-white transition duration-300 relative bg-amber-950 isolation-auto z-10 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-900 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
              onClick={(e)=>{
                e.preventDefault();
                
                let result = window.confirm("Are you sure you want to logout?");

                // Check the result
                if (result) {
                  removeCookies(["username","userType","accessToken"])
                  navigate('/login',{replace : true})
                } else {
                   alert("Cancelled");
                }
              }}
            >
              LogOut
            </button>
              
            </>
            
          )}
      </ul>
    </nav>
    <Outlet/>
    </>
  );
}

export default Navbar;