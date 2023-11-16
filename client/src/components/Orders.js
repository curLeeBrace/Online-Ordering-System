import React, { useState } from 'react';
import Navbar from './Navbar';

function OrderNavbar({ activeTab, onChangeTab }) {
  return (
    <div>
    <div className='text-sm md:text-lg font-light text-gray-500 whitespace-nowrap'>
    <nav className="flex justify-center bg-gray-100 p-2">
      <button
        className={`mx-2 px-4 py-2 rounded hover:scale-125 focus:outline-none ${
          activeTab === 'all' && 'font-bold border-b-4 border-black'
        }`}
        onClick={() => onChangeTab('all')}
      >
        All
      </button>
      <button
        className={`mx-2 px-4 py-2 rounded hover:scale-125 focus:outline-none ${
          activeTab === 'unpaid' && 'font-bold border-b-4 border-black'
        }`}
        onClick={() => onChangeTab('unpaid')}
      >
        Unpaid
      </button>
      <button
        className={`mx-2 px-4 py-2 rounded hover:scale-125 focus:outline-none ${
          activeTab === 'toShip' && 'font-bold border-b-4 border-black'
        }`}
        onClick={() => onChangeTab('toShip')}
      >
        To Ship
      </button>
      <button
        className={`mx-2 px-4 py-2 rounded hover:scale-125 focus:outline-none ${
          activeTab === 'shipped' && 'font-bold border-b-4 border-black'
        }`}
        onClick={() => onChangeTab('shipped')}
      >
        Shipped
      </button>
    </nav>
    </div>
    </div>
  );
}

function Orders() {
  const [activeTab, setActiveTab] = useState('all');
  


  const handleChangeTab = (tab) => {
    setActiveTab(tab);
    // Add logic to fetch and display orders based on the selected tab
  };

  return (
    <div>
        <Navbar />
      <OrderNavbar activeTab={activeTab} onChangeTab={handleChangeTab} />
      
      <div className="ml-4 mr-4 sm:flex-col justify-center items-center md:flex-row bg-white mt-4 rounded-lg shadow-2xl sm:text-sm md:text-sm p-4 mb-4 md:w-1/2 lg:w-1/4">
      <img
        src="./img/flavor1.png"
        alt="Milk Tea"
        className="lg:h-full md:w-full md:h-full sm:w-full md:h-60 sm:h-96 object-cover rounded-t-lg justify-center items-center"
      />
      <h2 className=" font-semibold mt-2 mb-2 text-sm">Milk Tea</h2>
      <p className="text-gray-600 text-sm">Hokkaido</p>
      <p className=" font-bold mt-2">Quantity</p>
      <p className="text-amber-900 font-bold mt-2">₱</p>
      
        <button
          className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none w-full"
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
}

export default Orders;
