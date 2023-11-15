import React, { Fragment, useEffect, useState } from "react";
import { UilMultiply } from "@iconscout/react-unicons";
import Menu from "./Menu";

const MilkTeaProduct = ({ product }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [pro_size, setProSize] = useState(null);
  const [price , setPrice] = useState(0);
  const [addsOn, setAddsOn] = useState(0);
  const [addPrice, setAddPrice] = useState(null);
  const [mod, setMod] = useState(null);
  const [total, setTotal] = useState(0);

  // console.log(price);
  //get the total
  useEffect(()=>{
    // const addsOnprice = 10 // fixed value, will change in future maybe :)
    let computeTotal = (qty * price) + addPrice;
    setTotal(computeTotal);
    


  },[qty, pro_size, addsOn])

  const clsoeModal = ()=> {

    setQty(1); 
    setProSize(null)
    setPrice(null)
    setAddsOn(null)
    setAddPrice(0);
    setMod(null)
    setTotal(0); 
    setModalOpen(false);
  }
  const placeOrder = (e ) => {
    e.preventDefault();

  }
  return (
    <div className="ml-4 mr-4 sm:flex-col justify-center items-center md:flex-row bg-white mt-4 rounded-lg shadow-2xl sm:text-sm md:text-sm p-4 mb-4 md:w-1/2 lg:w-1/4">
      <img
        src={`../img/products/milktea/${product.ImageName}`}
        alt="Milk Tea"
        className="md:w-full sm:w-1/2 md:h-60 sm:h-96 object-cover rounded-t-lg justify-center items-center"
      />
      <h2 className=" font-semibold mt-2 mb-2 text-sm">Milk Tea</h2>
      <p className="text-gray-600 text-sm">{product.Flavor}</p>
      {/* <p className="text-amber-900 font-bold mt-2">₱{totalPrice.toFixed(2)}</p> */}
      <button
        onClick={()=>setModalOpen(true)}
        className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none w-full"
      >
        Buy
      </button>

      {/* Pop up Card for placing an order */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center ml-4 mr-4 justify-center z-50 ">
          <div className="bg-white rounded-lg mt-0 shadow-2xl border border-amber-950 p-4 w-full md:w-96">
            <button
              onClick={clsoeModal}
              className="relative top-7 ml-64 md:left-0 md:ml-80 ml-56 font-bold hover:text-gray-700 cursor-pointer"
            >
              <UilMultiply size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4 mt-0">Select Options</h2>
            <label htmlFor="quantity" className="block font-semibold">
              Quantity:
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={qty}
                onChange={(e)=>{setQty(e.target.value)}}
                min="1"
                className="w-16 p-2 rounded border border-gray-300 focus:outline-none"
              />
            </label>
            <label className="block font-semibold mt-4">Size:</label>
            <div className="ml-4 space-y-2">
              {product.Size.map((size, index) => {
                let prices = product.Price.map((price)=> price); // make an array of prices
                return (
                  <Fragment key = {index}>
                    <label>
                      <input
                        type="radio"
                        name="sizes"
                        value= {`${size}`}
          
                        onChange={(e) => {setProSize(e.target.value); setPrice(prices[index])}}
                      />
                      {size}{` (₱${prices[index]})`}
                    </label>
                    <br></br>
                  </Fragment>
                );
              })}
            </div>

            <label className="block font-semibold mt-4">Adds-On:</label>
            <div className="ml-4 space-y-2">
              <label>
                <input
                  type="radio"
                  name="addon"
                  value="None"
                  // checked={selectedAddons === "None"}
                  // onChange={handleAddonChange}
                />{" "}
                None
              </label>
              <br></br>
              <label>
                <input
                  type="radio"
                  name="addon"
                  value="Tapioca Pearls"
                  // checked={}
                  onChange = {(e)=> {setAddsOn(e.target.value); setAddPrice(10)}}
                />
                Tapioca Pearls (+₱10)
              </label>
            </div>

            <label className="block font-semibold mt-4">Mode of payment:</label>
            <div className="ml-4 space-y-2">
              <label>
                <input type="radio" name="payment" /> Gcash
              </label>
              <br></br>
              <label>
                <input type="radio" name="payment" /> Cash-on Delivery
              </label>
            </div>

            <p className="text-amber-900 font-bold mt-4">
              Total: ₱{` ${total}.00`}
            </p>
            <button
              onClick={placeOrder}
              className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none w-full"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MilkTeaProduct;
