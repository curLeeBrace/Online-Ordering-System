import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UilBars, UilMultiply } from "@iconscout/react-unicons";
import { Outlet } from "react-router-dom";
import { useFetchUsername } from "../../customHooks/useEffect/myUseFetchEffect";
function Navbar() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(null);
  useFetchUsername(username,setUsername);
  
  return (
    <>
      <nav
        className={`p-5 bg-amber-950 shadow md:flex md:items-center md:justify-between`}
      >
        <div className="flex justify-between items-center">
          <span className="text-2xl font-[Poppins] cursor-pointer font-semibold text-lime-800">
            <img src="./img/milktealogo.png" alt="" className="h-10 inline" />{" "}
            Fortea
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
          className={`md:flex md:items-center z-[1] md:z-auto md:static absolute pb-12 bg-amber-950 w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 
        ${
          open ? "top-20" : "left-[-800px]"
        } transition-all ease-in duration-500`}
        >
          <li className="mx-4 md:my-0 sm:mb-2 md:hover:scale-150 duration-300 ">
            <Link
              to=""
              className="text-white hover:text-orange-200 transition-colors"
            >
              Home
            </Link>
          </li>
          <li className="mx-4 md:my-0 sm:mb-2 md:hover:scale-150 duration-300">
            <Link
              to="menu"
              className="text-white hover:text-orange-200 transition-colors"
            >
              Menu
            </Link>
          </li>

          <li className="mx-4 md:my-0 sm:mb-2 md:hover:scale-150  duration-300">
            <Link
              to="orders"
              className="text-white hover:text-orange-200 transition-colors"
            >
              My-Orders
            </Link>
          </li>

          <li className="mx-4 md:my-0 sm:mb-2 md:hover:scale-150  duration-300">
            <Link
              to="about"
              className="text-white hover:text-orange-200 transition-colors"
            >
              About
            </Link>
          </li>
          {username == null ? (
            <button className="w-28 bg-lime-800 h-10 mt-1 text-white rounded hover:text-orange-200">
              <Link to="/login">LogIn</Link>
            </button>
          ) : (
            username
          )}
        </ul>
      </nav>
      <Outlet/>
    </>
  );
}

export default Navbar;
