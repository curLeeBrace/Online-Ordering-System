
import React, { useState } from "react";

function OrdersProduct() {

    return (
        <div>
          <div className="sm:flex-col justify-center items-center md:flex-row bg-white mt-4 rounded-lg shadow-2xl sm:text-sm md:text-sm p-4 mb-4 md:w-full lg:w-full">
          <img
            src="./img/flavor1.png"
            alt="Milk Tea"
            className=" mx-auto md:w-full md:h-full  object-cover h-32 rounded-t-lg pt-4 pb-4"
          />
          <h2 className=" font-semibold mt-2 mb-2 text-sm">Milk Tea</h2>
          <p className="text-gray-600 text-sm">Hokkaido</p>
          <p className=" font-bold mt-2 text-sm">Quantity</p>
          <p className="text-amber-900 font-bold mt-2 text-sm">₱</p>
          
            <button
              className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none w-full"
            >
              Cancel Order
            </button>
          </div>
         
        </div>
      );
}

export default OrdersProduct