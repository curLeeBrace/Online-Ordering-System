import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar'
import { UilMultiply } from '@iconscout/react-unicons';
function AdminOrders() {

    let thClass = 'border-2 border-amber-900 p-2'
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
        <AdminNavbar />
        <div className='bg-gray-200 h-screen bg-gray-200 '>
        <div className="overflow-x-auto ml-4 mr-4">
          <h1 className='font-bold text-3xl text-amber-900'>Rider Accounts</h1>
            <table className="min-w-full border border-gray-300 mb-2 text-sm whitespace-nowrap">
              <thead >
                <tr>
                  <th className={thClass}>Customer No</th>
                  <th className={thClass}>Address</th>
                  <th className={thClass}>Quantity</th>
                  <th className={thClass}>Orders</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={thClass}>1</td>
                  <td className={thClass}>Sta,Cruz Duhat Sitio San Miguel 04-402</td>
                  <td className={thClass}>4</td>
                  <td className={thClass}>
                  <button className="bg-lime-900 font-bold text-white px-2 py-0 ml-0 mt-0 rounded hover:bg-lime-700 focus:outline-none"
                  onClick={openOrderDetails}>
                View Details
              </button>
              </td>
                </tr>  
              </tbody>
            </table>
            <table className="min-w-full border border-gray-300 mb-2 text-sm whitespace-nowrap">
              <thead >
                <tr>
                  <th className={thClass}>Customer No</th>
                  <th className={thClass}>Address</th>
                  <th className={thClass}>Quantity</th>
                  <th className={thClass}>Orders</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={thClass}>1</td>
                  <td className={thClass}>Sta,Cruz Duhat Sitio San Miguel 04-402</td>
                  <td className={thClass}>4</td>
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
              className="relative-auto top-auto ml-64 md:left-0 md:ml-80 ml-56 font-bold hover:text-gray-700 cursor-pointer hover:scale-150"
            >
              <UilMultiply size={20}/>
            </button>
            <table className="min-w-full border border-gray-300 mb-2 text-sm whitespace-nowrap">
              <thead className='mb-2'>
                <tr>
                  <th className={thClass}>Flavor</th>
                  <th className={thClass}>Quantity</th>
                  <th className={thClass}>Size</th>
                  <th className={thClass}>Price</th>
                  <th className={thClass}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td className={thClass}>Okinawa</td>
                  <td className={thClass}>2</td>
                  <td className={thClass}>S</td>
                  <td className={thClass}>50</td>
                  <td className={thClass}>₱5011212
              </td>
                </tr>  
              </tbody>
             
            </table>
            <table className="min-w-full border border-gray-300 mb-2 text-sm whitespace-nowrap">
              <thead className='mb-2'>
                <tr>
                  <th className={thClass}>Flavor</th>
                  <th className={thClass}>Quantity</th>
                  <th className={thClass}>Size</th>
                  <th className={thClass}>Price</th>
                  <th className={thClass}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td className={thClass}>Okinawa</td>
                  <td className={thClass}>2</td>
                  <td className={thClass}>S</td>
                  <td className={thClass}>50</td>
                  <td className={thClass}>₱5011212
              </td>
                </tr>  
              </tbody>
             
            </table>
            <button
              onClick={closeOrderDetails}
              className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none w-full"
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminOrders