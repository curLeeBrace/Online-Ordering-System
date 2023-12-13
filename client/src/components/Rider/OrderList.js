import React, { useState, useEffect, Fragment } from "react";
import { io } from "socket.io-client";
import { UilMultiply } from "@iconscout/react-unicons";

import { api } from "../../customHooks/configAxios";

import {getCookie} from "../../customHooks/cookiesHandler";
import { S_URL } from "../../customHooks/context/configSocket";

function OrderList() {
  let thClass = "border-2 border-amber-900 p-2 text-sm";
  let pCLass = "p-2 text-sm";
  let hClass = "p-2 font-bold text-sm";

  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [customerDatas, setCustomerDatas] = useState([]);
  const [delivery, setDelivery] = useState();
  const [userID, setUserID] = useState();

  useEffect(() => {
    const socket = io(`http://${S_URL}:3001/raider`);
    socket.on("delivery:get-avilable", (data) => {
      console.log(data); // can return userID or just get _id, for delivery purpose
      setCustomerDatas(data);
      
     
    });
  }, []);

  const viewDelivery = (orderID) => {
    api.post('/raider/get-orders', {orderID})
    .then(res => {
      // console.log(res.data);
      setDelivery(res.data);

      setIsOrderDetailsOpen(true);
    })
    .catch(err => console.log(err))

  }

  const deliverHandler = () => {
    console.log("User ID", userID);
    api.post('/raider/accept-deliver', {
      raiderUname  : getCookie("username"),
      userID : userID,
      orderID : delivery.Orders.OrderID,
      // proof_ofDelivery : "empty",
      major_index : delivery.MajorIndex
    })
    .then(res => {
      if(res.status === 200){
        alert("Succsess!");
        window.location.href = window.location.href;
      } else {
        alert("Something Wrong");
      }
    })
    .catch(err => console.error(err))
    
  }

  
 

  return (
    <div>
      <div className="bg-gray-200 h-screen bg-gray-200 ">
        <div className="overflow-x-auto ml-4 mr-4">
          <h1 className="font-bold text-3xl text-amber-900">Orders</h1>
          <table className="min-w-full border border-gray-300 mb-2 text-sm whitespace-nowrap">
            <thead>
              <tr>
                <th className={thClass}>Order ID</th>
                <th className={thClass}>Full Name</th>
                <th className={thClass}>Address</th>
                <th className={thClass}>Orders</th>
              </tr>
            </thead>
            <tbody>
              {customerDatas.map((customerData, index) => {
                return (
                  <Fragment key={customerData._id}>
                    <tr>
                      <td className={thClass}>{customerData.OrderID}</td>
                      <td className={thClass}>
                        {customerData.Fname + " " + customerData.Lname}
                      </td>
                      <td className={thClass}>
                        {customerData.Address.Brgy +
                          " " +
                          customerData.Address.Municipality +
                          " " +
                          customerData.Address.Street_N_House}
                      </td>
                      <td className={thClass}>
                        <button
                          className="bg-lime-900 font-bold text-white px-2 py-0 ml-0 mt-0 rounded hover:bg-lime-700 focus:outline-none"
                          onClick={() =>{
                            // viewOrders(index);
                            setUserID(customerDatas[index]._id);
                            viewDelivery(customerData.OrderID);
                            
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isOrderDetailsOpen && (
        <div className="fixed inset-0 flex items-center ml-4 mr-4 justify-center z-50 ">
          <div className="bg-white rounded-lg mt-0 shadow-2xl border border-amber-950 p-4 w-full md:w-auto relative">
            <button
              onClick={() => setIsOrderDetailsOpen(false)}
              className=" absolute top-2 right-2 font-bold hover:text-gray-700 cursor-pointer hover:scale-150"
            >
              <UilMultiply size={20} />
            </button>
            <table className="min-w-full border border-gray-300 mb-2 text-sm whitespace-nowrap">
              <thead className="mb-2">
                <tr>
                  <th className={thClass}>Flavor</th>
                  <th className={thClass}>AddsOn</th>
                  <th className={thClass}>Quantity</th>
                  <th className={thClass}>Size</th>
                  <th className={thClass}>Price</th>
                  <th className={thClass}>Total</th>
                  <th className={thClass}>PayMethod</th>
                  
                </tr>
              </thead>



              <tbody>
                {
                  delivery.Orders.Flavor.map((_, index) => {
                    return(
                      <Fragment key = {index}>
                          <tr>
                            <td>{delivery.Orders.Flavor[index]}</td>
                            <td>{delivery.Orders.AddsOn[index]}</td>
                            <td>{delivery.Orders.Qty[index]}</td>
                            <td>{delivery.Orders.Size[index]}</td>
                            <td>{delivery.Orders.Price[index]}</td>
                            <td>{delivery.Orders.Total[index]}</td>
                            <td>{delivery.Orders.MOD[index]}</td>
                           
                          </tr>
                      </Fragment>
                    )
                  })
                }
              </tbody>

            </table>
              <button
                className="bg-lime-900 font-bold text-white px-2 py-0 ml-0 mt-0 rounded hover:bg-lime-700 focus:outline-none"
                onClick={() => {deliverHandler()}}
              >
                Deliver
              </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderList;
