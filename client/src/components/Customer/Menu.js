import React, { Fragment, useEffect, useState } from "react";
import MilkTeaProduct from "./MilkTeaProduct";
import Navbar from "./Navbar";
//import { useFetchUsername } from "../customHooks/useEffect/myUseFetchEffect";

import { api } from "../../customHooks/configAxios";
function Menu() {
  
  

  const [products, setProducts] = useState([{}]);

  //get all product data
  useEffect(() => {
    api
      .get("/product/getAll")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));

  }, []);

  return (
    <div className="h-full bg-gray-200">
      {/* <Navbar user={{ username: username }} /> */}
      <p className="font-poppins text-3xl ml-16 mt-2 text-amber-900">Menu</p>
      <div className="flex md:flex-row sm:flex flex-col flex-wrap justify-center items-center">
        
        {products.map((product, index) => {
          return <Fragment key={`${product._id}`}>
            <MilkTeaProduct
              product = {product}
            />
          </Fragment>;
        })}


        

      </div>
    </div>
  );
}

export default Menu;
