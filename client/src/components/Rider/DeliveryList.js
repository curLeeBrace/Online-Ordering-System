import React, {useState, useEffect, Fragment} from "react";
import { UilMultiply } from "@iconscout/react-unicons";

import { api } from "../../customHooks/configAxios";
import {getCookie} from "../../customHooks/cookiesHandler";

function DeliveryList() {
  let thClass = "border-2 border-amber-900 p-2 text-sm";
  let pCLass = "p-2 text-sm";
  let hClass = "p-2 font-bold text-sm";

  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
 

  const [customerDatas, setCustomerDatas] = useState(null);
  const [orders, setOrders] = useState(null);
  const [image, setImage] = useState();


  useEffect(()=> {
    api.post('/raider/get-allDelivery', {raider_username : getCookie("username")})
    .then((res) => {
      setCustomerDatas(res.data);
      console.log(res.data);
    })
    .catch(err => console.error(err));
  }, [])


  const uploadProofHandler = (e) => {
    e.preventDefault();
    alert(image.name);
    console.log(image.name);
    
    // const formData = new FormData();
    // formData.append("OrderID", orders.Orders.OrderID);
    // formData.append("MajorIndex", orders.MajorIndex);



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

              {customerDatas !== null ? customerDatas.UserInfo.map((_, index) => {
                return (
                  <Fragment key = {index}>
                    <tr>
                      <td className={thClass}>{customerDatas.UserInfo[index]._id}</td>
                      <td className={thClass}>{customerDatas.UserInfo[index].Fname +" "+ customerDatas.UserInfo[index].Lname}</td>
                      <td className={thClass}>{customerDatas.Address[index].Brgy + " " + customerDatas.Address[index].Municipality + " " + customerDatas.Address[index].Street_N_House}</td>
                      <td className={thClass}>
                        <button
                          className="bg-lime-900 font-bold text-white px-2 py-0 ml-0 mt-0 rounded hover:bg-lime-700 focus:outline-none"
                          onClick={()=> {
                            setOrders(customerDatas.Orders[index]);
                            console.log(customerDatas.Orders[index])
                            setIsOrderDetailsOpen(true);
                          }}
                        >
                          See Orders
                        </button>
                      </td>
                    </tr>

                  </Fragment>
                )
                
              }) : null
              
              
              
              
              
              
              
              }
              
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
                  orders.Orders.Flavor.map((_, index) => {
                    return(
                      <Fragment key = {index}>
                          <tr>
                            <td>{orders.Orders.Flavor[index]}</td>
                            <td>{orders.Orders.AddsOn[index]}</td>
                            <td>{orders.Orders.Qty[index]}</td>
                            <td>{orders.Orders.Size[index]}</td>
                            <td>{orders.Orders.Price[index]}</td>
                            <td>{orders.Orders.Total[index]}</td>
                            <td>{orders.Orders.MOD[index]}</td>
                           
                          </tr>
                      </Fragment>
                    )
                  })
                }
              </tbody>
            </table>
            <form onSubmit = {uploadProofHandler}>
              <label for="img">Proof of Delivery: </label>
              <input type="file" id="img" name="proof" accept="image/*" required onChange={(e)=>{setImage(e.target.files[0])}}/>
              <input className = "border-2 border-green-900 p-2 text-sm " type = "submit" value ="upload"/>
              
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeliveryList;
