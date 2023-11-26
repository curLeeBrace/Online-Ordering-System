import React, { useState } from 'react';

import { UilMultiply } from '@iconscout/react-unicons';
function OrderList() {

    let thClass = 'border-2 border-amber-900 p-2 text-sm'
    let pCLass = 'p-2 text-sm'
    let hClass = 'p-2 font-bold text-sm'
    const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

    const openOrderDetails = () => {
      setIsOrderDetailsOpen(true);
      // You can fetch the order details here based on the selected order
      // For simplicity, let's assume order details are available in state
    };
  
    const closeOrderDetails = () => {
      setIsOrderDetailsOpen(false);
    };
  return (
    <div>
      <div className='bg-gray-200 h-screen bg-gray-200 '>
      <h1 className='font-bold text-3xl text-amber-900 flex justify-center mb-2'>Orders</h1>
        <div className="overflow-x-auto ml-4 mr-4 flex justify-center">
          
            <table className="border border-gray-300 mb-2 text-sm whitespace-nowrap">
              <thead >
                <tr>
                  <th className={thClass}>Customer No</th>       
                  <th className={thClass}>Orders</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={thClass}>1</td>
              
                  <td className={thClass}>
                  <button className="bg-lime-900 font-bold text-white px-2 py-0 ml-0 mt-0 rounded hover:bg-lime-700 focus:outline-none"
                  onClick={openOrderDetails}>
                View Details
              </button>
              </td>
                </tr>  
              </tbody>
            </table>
            
            
            
          </div>
        </div>
        
      {isOrderDetailsOpen && (
        <div className="fixed inset-0 flex items-center ml-4 mr-4 justify-center z-50 ">
          <div className="bg-white rounded-lg mt-0 shadow-2xl border border-amber-950 p-4 w-full md:w-auto">
            <button
              onClick={closeOrderDetails}
              className="relative-auto top-auto ml-64 md:left-0 md:ml-80 font-bold hover:text-gray-700 cursor-pointer hover:scale-150"
            >
              <UilMultiply size={20}/>
            </button>

      <h1 className={hClass}>Flavor</h1>
      <p className={pCLass}>Hokkaido</p>
      <h1 className={hClass}>Quantity</h1>
      <p className={pCLass}>4</p>
      <h1 className={hClass}>Size</h1>
      <p className={pCLass}>Small</p>
      <h1 className={hClass}>Price</h1>
      <p className={pCLass}>1000</p>


            <button
              onClick={closeOrderDetails}
              className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none w-full"
            >
              Get Item
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderList