import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UilBars, UilMultiply } from "@iconscout/react-unicons";
import { Outlet } from "react-router-dom";
function AdminNavbar() {
  const [open, setOpen] = useState(false);
//figs change
  let {pathname} = useLocation()
  let subpage = pathname.split('/')?.[1]

  function link (type = null){
    if(subpage === ''){
      subpage = 'orders'
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
       <li className={link('accounts')}>
          <Link to="accounts">
            Accounts
          </Link>
        </li>
        <li className={link('rider')}>
          <Link to="rider">
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
        <li className={link('inventory')}>
          <Link to="inventory">
            Inventory
          </Link>
        </li>
        <li className={link('adminorders')}>
          <Link to="adminorders">
            Orders
          </Link>
        </li>
        </ul>
      </nav>
      <Outlet/>
    </>
  );
}

export default AdminNavbar
