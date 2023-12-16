import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UilBars, UilMultiply } from "@iconscout/react-unicons";
import { Outlet } from "react-router-dom";
import { removeCookies, getCookie} from "../../customHooks/cookiesHandler";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();
  
    const [open, setOpen] = useState(false);
    //figs change
    let {pathname} = useLocation()
    let subpage = pathname.split('/')[2]
/*
  useEffect(()=>{
    const username = getCookie("username") 
    const type = getCookie("userType");
    const accessToken = getCookie("accessToken");
    if(getCookie("userType") !== "admin" && getCookie("userType") !== null){
      navigate('/login', {replace:true});
    } 



  },[])
*/

  function link (type = null){
    if(subpage === ''){
      subpage = 'accounts'
    }
    let classes = 'text-white hover:text-orange-200 mx-6 md:my-0 sm:mb-2 md:hover:scale-150 duration-300'
    

    if(type === subpage){
      classes += " text-orange-200 font-bold md:border-b-4 md:border-orange-200 md:text-orange-200 md:scale-12"
    }
    
    return classes;

  }

  return (
    <>
      <nav
        className={`p-5 bg-amber-950 shadow md:flex md:items-center md:justify-center`}
      >
        <div className="flex justify-between items-center">
          <span className="text-2xl font-[Poppins] cursor-pointer font-semibold text-lime-800">
            <img src="./img/milktealogo.png" alt="" className="h-10 inline" />{" "}
            Admin
          </span>
          <span>
            <div className="text-3xl absolute -mt-4 right-8 md:hidden hover:-scale-y-100 duration-300 cursor-pointer">
              {open ? (
                <div>
                  <UilMultiply
                    size={32}
                    onClick={() => setOpen(false)}
                    style={{ color: "white" }}
                  />
                </div>
              ) : (
                <div>
                  <UilBars
                    size={32}
                    onClick={() => setOpen(true)}
                    style={{ color: "white" }}
                  />
                </div>
              )}
            </div>
          </span>
        </div>

        <ul
          className={`md:ml-14 md:flex md:items-center z-[1] md:z-auto md:static absolute pb-12 bg-amber-950 w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 
        ${
          open ? "top-20" : "left-[-800px]"
        } transition-all ease-in duration-500`}
        >
       {/* <li className={link('accounts')}>
          <Link to="accounts">
            Accounts
          </Link>
        </li> */}
        <li className={link('rider')}>
          <Link to="raider">
            Rider Accounts
          </Link>
        </li>
        <li className={link('sales')}>
          <Link to="sales">
            Sales
          </Link>
        </li>
        <li className={link('products')}>
          <Link to="products">
            Products
          </Link>
        </li>
        {/* <li className={link('inventory')}>
          <Link to="inventory">
            Inventory
          </Link>
        </li> */}
        <li className={link('admin-orders')}>
          <Link to="admin-orders">
            Orders
          </Link>
        </li>
        <li>
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
        </li>
        </ul>
      </nav>
      <Outlet/>
    </>
  );
}

export default AdminNavbar