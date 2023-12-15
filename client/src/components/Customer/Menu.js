import React, { Fragment, useEffect, useState } from "react";
import MilkTeaProduct from "./MilkTeaProduct";
//import { useFetchUsername } from "../customHooks/useEffect/myUseFetchEffect";
import LoadingPage from "../../Loading";
import { api } from "../../customHooks/configAxios";
function Menu() {
  
  

  const [products, setProducts] = useState(null);

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
    <div className="min-h-screen bg-gray-200">
      {/* <Navbar user={{ username: username }} /> */}
      <p className="font-poppins text-3xl md:ml-10 sm:ml-4 pt-2 text-3xl font-semibold text-amber-950 flex justify-center">Menu</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 flex md:flex-row sm:flex flex-col flex-wrap justify-center items-center">
        
        {products !==null?
          products.map((product, index) => {
            return <Fragment key={`${product._id}`}>
              <MilkTeaProduct
                product = {product}
              />
            </Fragment>;
          }) :<LoadingPage/>
        }


        

      </div>
    </div>
  );
}

export default Menu;
