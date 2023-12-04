

function Orders({index, orderDetails}) {

    return (
      <div>

        <div className="justify-center items-center md:flex-row bg-white mt-4 rounded-lg shadow-2xl sm:text-sm md:text-sm p-4 mb-4 md:w-full lg:w-full">
        <img
          src = {`./img/products/milktea/${orderDetails.Img[index]}`}
          alt="Milk Tea"
          className="mx-auto md:w-64 md:h-64 object-contain h-32 rounded-t-lg pt-4 pb-4"
        />
        <h2 className=" font-semibold mt-2 mb-2 text-sm"> MilkTea </h2>
        <p className="text-gray-600 text-sm">Flavor: {orderDetails.MTname[index]}</p>
        <p className=" font-bold mt-2">Quantity: {orderDetails.Qty[index]}</p>
        <p className="text-amber-900 font-bold mt-2">₱ {orderDetails.Total[index]}</p>
        
        {orderDetails.Status[index] == 0
          ? <button
             className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none w-full"
            >
              Cancel Order
             </button> 
            : orderDetails.Status[index] == 1 
            ? "Order Confirmed!"
            :  orderDetails.Status[index] == 2
            ? "To Ship" 
            : orderDetails.Status[index] == 3
            ? "Dellivered" : "Cancelled"
   
        }
         
        </div>
      </div>
    );
  }
  export default Orders;