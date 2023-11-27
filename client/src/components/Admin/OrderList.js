
import { useEffect } from "react";
import { api } from "../../customHooks/configAxios";
import { useOrder } from "../../customHooks/context/order_context";
const OrderList = ({thClass, orderDetails, index}) => {


    const confirmOrder = (e) => {
        e.preventDefault();
        api.post('/admin/confirm-order', {
            orderID : orderDetails._id,
            index : index
        })
        .then(res => alert(res.data))
        .catch(err => console.error(err))
    }
    console.log("Index  : ", index);
    console.log(orderDetails);
    return (
     
         <tr>
          <td className={thClass}>{orderDetails.MTname[index]}</td>
          <td className={thClass}>{orderDetails.AddsOn[index]}</td>
          <td className={thClass}>{orderDetails.Qty[index]}</td>
          <td className={thClass}>{orderDetails.Size[index]}</td>
          <td className={thClass}>{orderDetails.Price[index]}</td>
          <td className={thClass}>{orderDetails.Total[index]}</td>
          <td className={thClass}>{orderDetails.MOD[index]}</td>
          <td className={thClass}>
              {orderDetails.Status[index] === 0 ?
              <button
                onClick={confirmOrder}
                className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none w-full"
              >
                Confirm Order
              </button> 
              : orderDetails.Status[index] === 1 ? 
                "Order Confirmed!" : "Out for delivery!"
              }
        
          </td>
        </tr>
        
   
  );
};


export default OrderList;
