import { Fragment } from "react";
import { useState, useEffect } from "react";
import Orders from "./Orders";
import { getCookie } from "../../customHooks/cookiesHandler";
import { api } from "../../customHooks/configAxios";
import {io} from "socket.io-client";



 
function OrderNavbar() {
  const [activeTab, setActiveTab] = useState(0);
  const [orders, getOrders] = useState(null);
  const socket = io('http://localhost:3001/customer');

  useEffect(() => {
 

      const username = getCookie("username");

      try {
        
      } catch (error) {
        console.log.error(error);
      }
      if(username != null) {
        socket.emit('order:get', username, (res) => {
         
          getOrders(res);
   
        });

        
      }
     
      //update order status
      socket.on('order:update', (index, updatedStatus)=> {
      console.log("update!!", index, " ", updatedStatus);
         getOrders((prevOrder)=>{
            const newStatus = [...prevOrder.Status] // get all the array of Status
            newStatus[index] = updatedStatus; // update the specific index of Status
            return {...prevOrder, Status : newStatus}; // return all Array, with new Value
          })

        console.log(orders);
      });
      // api
      //   .post("customer/get-customer-order", { username: getCookie("username") })
      //   .then((res) => {
      //     getOrders(res.data);
      //   })
      //   .catch((err) => console.error(err));
 
      
  }, []);

  
  // if(orders != null){

  

  //   console.log(orders.Status);

    
  // } 

  // if(orders === null) console.log("order is ", null);
  // socket.on('order:update', (index, updatedStatus)=> {
  // console.log("update!!", index, " ", updatedStatus);
  // console.log(orders); // null it game me error

  // });
  // console.log("activeTab ", activeTab);
  // console.log(orders)
  return (
   
    <div>
      <div className="text-sm md:text-lg font-light text-gray-500 whitespace-nowrap">
        <nav className="flex justify-center bg-gray-100 p-2">
          <button
            className={`mx-2 px-4 py-2 rounded hover:scale-125 focus:outline-none ${
              activeTab === 0 && "font-bold border-b-4 border-black"
            }`}
            onClick={() => setActiveTab(0)} // means all
          >
            All
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded hover:scale-125 focus:outline-none ${
              activeTab === 1 && "font-bold border-b-4 border-black"
            }`}
            onClick={() => setActiveTab(1)} // means unpaid
          >
            Unpaid
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded hover:scale-125 focus:outline-none ${
              activeTab === 2 && "font-bold border-b-4 border-black"
            }`}
            onClick={() => setActiveTab(2)}// means out for delivery or out for delivery
          >
            To Ship
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded hover:scale-125 focus:outline-none ${
              activeTab === 3 && "font-bold border-b-4 border-black"
            }`}
            onClick={() => setActiveTab(3)}// means delivered or Shiped
              
          >
            Shipped
          </button>
        </nav>
      </div>
      
      <div className="min-h-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 ml-4 mr-4 mt-4 mb-4">
      {orders != null
        ? orders.Status.map((status, index) => {
            
            const isPaid = orders.Paid[index];
            if (activeTab === 0) { //list all order
              return (
                <Fragment key={index}>
                  <Orders index = {index} orderDetails = {orders}/>
                </Fragment>
              );
            } 

            if (activeTab === 1 && isPaid === false) { //list all unpaid order
              return (
                <Fragment key={index}>
                  <Orders index = {index} orderDetails = {orders}/>
                </Fragment>
              );
            } else if(activeTab !== 1 && status === activeTab){ //list either to ship or already shipped order
   
              return (
                <Fragment key={index}>
                  <Orders index = {index} orderDetails = {orders}/>
                </Fragment>
              );
            } else {
              index++; // skip element
            }
            
           


          })
        : null}
        </div>
        
    </div>
  );
}

export default OrderNavbar;
