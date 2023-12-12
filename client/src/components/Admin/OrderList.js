
import { useEffect, useState } from "react";
import { api } from "../../customHooks/configAxios";
import { io } from "socket.io-client"
const OrderList = ({thClass, orderDetails, index}) => {


    const [status, setStatus] = useState(0);
    const sokcet = io("http://localhost:3001/admin");
   
    useEffect(()=>{
      setStatus(orderDetails.Status[index]);
 
    },[])

    const confirmOrder = (e) => {
        e.preventDefault();

        sokcet.emit("order:confirmed", orderDetails._id, index, (res)=>{
          if(res.succsess ){
            if(res.updatedStatus == 1){
              alert("Order Confirmed!");
              setStatus(res.updatedStatus);
  
            } // and so on.... add more updated status...

          }
        })

    }


    console.log("STATUS  : ", status);
    // console.log(orderDetails);
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
              {status === 0 ?
              <button
                onClick={confirmOrder}
                className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none w-full"
              >
                Confirm Order
              </button> 
              : status === 1 ? 
                "Order Confirmed!" 
              : status === 2 ? 
                "Out for delivery!"
              : <>
                  <a href = "http://facebook.com">View Proof </a>
                  <button  
                    className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:inline-none w-100%"
                   >
                      Complete
                  </button> 
                </>
              

              }
        
          </td>
        </tr>
        
   
  );
};


export default OrderList;
