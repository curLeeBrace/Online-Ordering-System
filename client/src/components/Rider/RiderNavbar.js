import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UilBars, UilMultiply } from '@iconscout/react-unicons';
import { Outlet } from "react-router-dom";
import { getCookie, removeCookies} from '../../customHooks/cookiesHandler';
import { useNavigate } from 'react-router-dom';
// import { useFetchUsername } from "../../customHooks/useEffect/myUseFetchEffect";


function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // const [username, setUsername] = useState(null);
  // useFetchUsername(username,setUsername);
  useEffect(()=>{
    const userType = getCookie("userType");
    console.log(userType);
    if(getCookie("userType") !== "raider" && getCookie("userType") !== null){
      navigate('/login', {replace:true});
    }
    
  },[])
  



  let {pathname} = useLocation()
  let subpage = pathname.split('/')[2]

  function link (type = null){
    if(subpage === ''){
      subpage = 'my-delivery'
    }
    let classes = 'text-white hover:text-orange-200 mx-4 md:my-0 sm:mb-2 md:hover:scale-150 duration-300'
    

    if(type === subpage){
      classes += ' font-bold md:border-b-4 md:border-orange-200 md:text-orange-200 text-orange-200';
    }
    
    return classes;

  }


  return (
    <>
    <nav className={`p-5 bg-amber-950 shadow md:flex md:items-center md:justify-between`}>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-[Poppins] cursor-pointer font-semibold text-lime-800">
          <img src="./img/milktealogo.png" alt="" className="h-10 inline" /> Fortea
        </span>
        <span>
          <div className="text-3xl absolute -mt-4 right-8 md:hidden hover:-scale-y-100 duration-300 cursor-pointer">
            {open ? (
              <div >
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
        <li className={link('order-list')}>
          <Link to="order-list" >
            Order List
          </Link>
        </li>
        <li className={link('my-delivery')}>
          <Link to="my-delivery" >
            My Delivery
          </Link>
        </li>

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
          
      </ul>
    </nav>
    <Outlet/>
    </>
  );
}

export default Navbar;