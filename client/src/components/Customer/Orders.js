
import {useEffect, useState} from 'react';
import {api} from '../../customHooks/configAxios';
import { UilMultiply } from "@iconscout/react-unicons";

function Orders({index, orderDetails}) {
  const [feedBack, setFeedBack] = useState("");
  const [feedBox, setFeedBox] = useState(false);
    useEffect(()=>{

      // console.log("Index : ", index);
      console.log(orderDetails);
      // console.log("FeedBack", feedBack)
    },[feedBack])

    const cancelOrder = () => {
      const order_id = orderDetails._id;
      const pay_id = orderDetails.Pay_ID[index];
      const mod = orderDetails.MOD[index];
      const total_ammount = orderDetails.Total[index];
      console.log(pay_id);
     
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
      
        // alert("Something Wrong, please try to refresh the page...");
        // window.location.href = window.location.href;
      

    }


    const submitFeedBack = () => {

      api.post('/customer/submit-feedback',{
        customer_Fback : feedBack,
        orderID : orderDetails._id,
        index : index
      })
      .then(res => {
        if(res.status === 200){
          alert("Thankyou For giving a feedback");
          window.location.href = window.location.href;
        }
      })
      .catch(err => console.log(err))
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
            ? "Dellivered" 
            : orderDetails.Status[index] === 4
            ?"Cancelled" 
            : orderDetails.FeedBack[index] === "" ?
            <>
            <span>Completed</span>
            <button
             className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none w-full"
              onClick={()=> setFeedBox(true)}
            >
              
              Give FeedBack
            </button>
              
            
            </> : <span>Completed</span>
   
        }

        {
          feedBox === true ? 
          <div className="fixed inset-0 flex items-center ml-4 mr-4 justify-center z-50 ">
              <div className="bg-white rounded-lg mt-0 shadow-2xl border border-amber-950 p-4 w-full md:w-auto relative">
                <button
                  onClick={() => {setFeedBox(false); setFeedBack("")}}
                  className="absolute top-2 right-2 font-bold hover:text-gray-700 cursor-pointer hover:scale-150"
                >
                  <UilMultiply size={20} />
                </button>
                  <p>Feed Back : </p>
                  {/* maxlength = "75" */}
                  <textarea className="w-full p-2 border rounded" rows="4" cols="30" value ={feedBack} onChange={(e)=> setFeedBack(e.target.value)}>
                    
                  </textarea> <br></br>
                  <button
                    className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none w-full"
                      onClick={submitFeedBack}
                    >
                      
                      Submit
                  </button>
              </div> 
           
            </div> : null
        }
         
        </div>
      </div>
    );
  }
  export default Orders;