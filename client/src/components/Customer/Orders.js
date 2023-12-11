
import {useEffect} from 'react';
import {api} from '../../customHooks/configAxios';
function Orders({index, orderDetails}) {
    useEffect(()=>{

      // console.log(orderDetails);
    },[])

    const cancelOrder = () => {
      const order_id = orderDetails._id;
      const pay_id = orderDetails.Pay_ID[index];
      const mod = orderDetails.MOD[index];
      const total_ammount = orderDetails.Total[index];
      console.log(pay_id);
      if(pay_id !== "" && pay_id !== undefined){
        api.post('/customer/cancel-order',{order_id, pay_id, mod, total_ammount, index})
        .then(res => {
          if(res.status === 200){
            alert("Cancelled!");
            window.location.href = window.location.href;
          } else {
            alert("Please Try Again!");
            window.location.href = window.location.href;
  
          }
        })
        .catch(err => console.error(err));
      } else {
        alert("Something Wrong, please try to refresh the page...");
        // window.location.href = window.location.href;
      }

    }
    return (
      <div>

        <div  className="sm:flex-col justify-center items-center md:flex-row bg-white mt-4 rounded-lg shadow-2xl sm:text-sm md:text-sm p-4 mb-4 md:w-full lg:w-full">
        <img
          src = {`./img/products/milktea/${orderDetails.Img[index]}`}
          alt="Milk Tea"
          className="mx-auto md:w-full md:h-full  object-cover h-32 rounded-t-lg pt-4 pb-4"
        />
        <h2 className=" font-semibold mt-2 mb-2 text-sm"> MilkTea </h2>
        <p className="text-gray-600 text-sm">Flavor: {orderDetails.MTname[index]}</p>
        <p className=" font-bold mt-2">Quantity: {orderDetails.Qty[index]}</p>
        <p className="text-amber-900 font-bold mt-2">₱ {orderDetails.Total[index]}</p>
        
        {orderDetails.Status[index] === 0
          ? <button
             className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none w-full"
             onClick={cancelOrder}
            >
              Cancel Order
             </button> 
            : orderDetails.Status[index] === 1 
            ? "Order Confirmed!"
            :  orderDetails.Status[index] === 2
            ? "To Ship" 
            : orderDetails.Status[index] === 3
            ? "Dellivered" : "Cancelled"
   
        }
         
        </div>
      </div>
    );
  }
  export default Orders;