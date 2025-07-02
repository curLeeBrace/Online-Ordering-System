
import { useEffect, useState } from "react";
import { io } from "socket.io-client"
import { S_URL } from "../../customHooks/context/configSocket";
const OrderList = ({thClass, orderDetails, index}) => {


    const [status, setStatus] = useState(0);
    const sokcet = io(`http://${S_URL}:3001/admin`);
   
    useEffect(()=>{
      setStatus(orderDetails.Status[index]);
 
    },[])

    const confirmOrder = (e, newStatus) => {
        e.preventDefault();

        sokcet.emit("order:confirmed", orderDetails._id, index, newStatus, (res)=>{
          if(res.succsess ){
            if(res.updatedStatus === 1){
              alert("Order Confirmed!");
              setStatus(res.updatedStatus);
  
            } else {
              alert("Order Completed!");
              setStatus(res.updatedStatus);
            }// and so on.... add more updated status...

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
                onClick={(e)=>confirmOrder(e, 1)}
                className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none w-full"
              >
                Confirm Order
              </button> 
              : status === 1 ? 
                "Order Confirmed!" 
              : status === 2 ? 
                "Out for delivery!"
              : status === 3 ?
                <>
                  <a href = {`http://localhost:3000/img/proof_of_delivery/${orderDetails.ProofOfDelivery[index]}`} target="_blank">
                    View Proof
                 </a>
                  <button  
                    className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:inline-none w-100%"
                    onClick={(e)=>confirmOrder(e, 5)}
                   >
                      Complete
                  </button> 
                </>
              : status === 4 ?
                "Cancelled!" : "Completed"
              }
        
          </td>
        </tr>
        
   
  );
};


export default OrderList;
