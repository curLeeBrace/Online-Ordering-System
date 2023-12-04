import React, { useState, useEffect, Fragment } from "react";
import { api } from "../../customHooks/configAxios";
import CustomerInfo from "./CustomerInfo";
import { UilMultiply } from '@iconscout/react-unicons';
import OrderList from "./OrderList";
import {io} from "socket.io-client";
import { useOrder } from "../../customHooks/context/order_context";
function AdminOrders() {
  let thClass = "border-2 border-amber-900 p-2";
  
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [customerDatas, setCustomerDatas] = useState([]);
  const order = useOrder();
 
  useEffect(() => {
    const socket = io("http://localhost:3001/admin");
    socket.on("order:list", (data)=>{
      setCustomerDatas(data);
      // console.log(data);
    });

    // console.log(customerDatas);

    // console.log("orders!", )
 
  }, []);
  
  

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
                {customerDatas.map((customerData) => {
                  return (
                    <Fragment key={customerData._id}>
                      <CustomerInfo thClass={thClass} customerData={customerData} setIsOrderDetailsOpen = {setIsOrderDetailsOpen}/>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/*dapat andito yung div nung isa pang table para di nag coconflic sa DOM, nag kaka error*/}


          {isOrderDetailsOpen && (
            <div className="fixed inset-0 flex items-center ml-4 mr-4 justify-center z-50 ">
              <div className="bg-white rounded-lg mt-0 shadow-2xl border border-amber-950 p-4 w-full md:w-auto relative">
                <button
                  onClick={() => setIsOrderDetailsOpen(false)}
                  className="absolute top-0 right-2 font-bold hover:text-gray-700 cursor-pointer"
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
                      <th className={thClass}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    { 
                      order.orderList.MTname.map((_, index) => {
                        return(
                          <Fragment key = {index}>
                            <OrderList orderDetails = {order.orderList} index = {index}/>
                          </Fragment>
                        );
                      })
                      
                    }
                  </tbody>
   
                </table>
              </div>
            </div>
          )}


        </div>
      </div>
    
  );
}

export default AdminOrders;
