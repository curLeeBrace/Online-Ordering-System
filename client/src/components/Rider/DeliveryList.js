import React, { useState } from 'react';

import { UilMultiply } from '@iconscout/react-unicons';
function DeliveryList() {

    let thClass = 'border-2 border-amber-900 p-2 text-sm'
    let pCLass = 'p-2 text-sm'
    let hClass = 'p-2 font-bold text-sm'
    
    const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

    const openOrderDetails = () => {
      setIsOrderDetailsOpen(true);

    };
  
    const closeOrderDetails = () => {
      setIsOrderDetailsOpen(false);
    };
  return (
    <div>
      <div className='bg-gray-200 h-screen bg-gray-200 '>
      <h1 className='font-bold text-3xl text-amber-900 flex justify-center mb-2'>Delivery</h1>
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
        <div className="fixed inset-0 flex items-center ml-4 mr-4 justify-center">
          <div className="bg-white overflow-y-auto max-h-full rounded-lg shadow-2xl border border-amber-950 p-4 w-full md:w-auto">
            <button
              onClick={closeOrderDetails}
              className="relative-auto ml-64 md:left-0 md:ml-80 ml-64 font-bold hover:text-gray-700 cursor-pointer hover:scale-150"
            >
              <UilMultiply size={20}/>
            </button>
     <h1 className={hClass}>Name</h1>
      <p className={pCLass}>Mark Angelo D. Figueroa</p>
      <h1 className={hClass}>Address</h1>
      <p className={pCLass}>Sitio San Miguel 04-67 Brgy. Duhat Sta.Cruz  </p>
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
              Deliver
            </button>
          </div>
        </div>
      )}
    </div>
    
  )
}

export default DeliveryList