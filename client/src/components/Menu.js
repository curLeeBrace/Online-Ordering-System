import React, { Fragment, useEffect, useState } from "react";
import MilkTeaProduct from "./MilkTeaProduct";
import Navbar from "./Navbar";
import { useFetchUsername } from "../customHooks/useEffect/myUseFetchEffect";
import { useAuth } from "../customHooks/context/auth";
import { api } from "../customHooks/configAxios";
function Menu() {
  const auth = useAuth();
  const { username, login } = auth;
  //get userName
  useFetchUsername(username, login); // might delete later beacause of future changes in Code Structure in NavBar

  //  const [flavors, setFlavors] = useState([]);
  //  const [sizes, setSizes] = useState([]);
  //  const [prices, setPrices] = useState([]);
  //  const [imgNames, setImageNames] = useState([]);

  const [products, setProducts] = useState([{}]);

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
      <Navbar user={{ username: username }} />
      <p className="font-poppins text-3xl ml-16 mt-2 text-amber-900">Menu</p>
      <div className="flex md:flex-row sm:flex flex-col flex-wrap justify-center items-center">
        
        {products.map((product) => {
          return <Fragment key={product._id}>
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
