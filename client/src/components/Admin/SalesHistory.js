import React, { useState } from 'react';


const SalesHistory = () => {
  const [selectedOption, setSelectedOption] = useState('Day'); 

 
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const salesData = [ //for visualization purposes only haha :) :(
    { date: '2023-10-10', amount: 500 },
    { date: '2023-10-11', amount: 750 },
    { date: '2023-10-12', amount: 600 },
    { date: '2023-10-10', amount: 500 },
    { date: '2023-10-11', amount: 750 },
    { date: '2023-10-12', amount: 600 },
    { date: '2023-10-10', amount: 500 },
    { date: '2023-10-11', amount: 750 },
    { date: '2023-10-12', amount: 600 },
    { date: '2023-10-10', amount: 500 },
    { date: '2023-10-11', amount: 750 },
    { date: '2023-10-12', amount: 600 },
    { date: '2023-10-10', amount: 500 },
    { date: '2023-10-11', amount: 750 },
    { date: '2023-10-12', amount: 600 },
    { date: '2023-10-10', amount: 500 },
    { date: '2023-10-11', amount: 750 },
    { date: '2023-10-12', amount: 600 },
    { date: '2023-10-10', amount: 500 },
    { date: '2023-10-11', amount: 750 },
    { date: '2023-10-12', amount: 600 },
    { date: '2023-10-10', amount: 500 },
    { date: '2023-10-11', amount: 750 },
    { date: '2023-10-12', amount: 600 },
    { date: '2023-10-10', amount: 500 },
    { date: '2023-10-11', amount: 750 },
    { date: '2023-10-12', amount: 600 },
    

   

  ];

  return (
    <div>
    {/* <AdminNavbar /> */}
    <div className="p-4 h-full w-full sm:w-full bg-gray-200 mx-auto">
      <div className="mb-4 text-amber-950 mb-4 flex justify-center ">
        
        
      </div>

      {/* Display sales data based on the selected option */}
      <div className="bg-white p-4 rounded-lg shadow-lg w-full mx-auto">
      <h2 className="text-3xl text-amber-950 font-bold mb-4 flex justify-center ">Sales History</h2>
      <label className="block text-sm font-semibold mb-2 whitespace-nowrap md:ml-0 sm:-ml-10 ">Filter Sales:</label>
      <div className="flex space-x-4 whitespace-normal mb-2">
          <label>
            <input
              type="radio"
              value="Day"
              checked={selectedOption === 'Day'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Sales This Day
          </label>
          <label>
            <input
              type="radio"
              value="Week"
              checked={selectedOption === 'Week'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Sales This Week
          </label>
          <label>
            <input
              type="radio"
              value="Month"
              checked={selectedOption === 'Month'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Sales This Month
          </label>
        </div>
        {/* You can fetch and display sales data based on the selected option */}
        <p>
          Displaying sales for: <strong>{selectedOption}</strong>
        </p>
         {/* Table to display sales data */}
         <table className="min-w-full border border-gray-300 text-sm mt-4">
          <thead>
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, index) => (
              <tr key={index}>
                <td className="border p-2">{sale.date}</td>
                <td className="border p-2">{sale.amount}</td>
                <td className="border p-2">{sale.amount}</td>
                <td className="border p-2">{sale.date}</td>
                <td className="border p-2">{sale.amount}</td>
                <td className="border p-2">{sale.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      
      </div>
      </div>
    </div>
  );
};

export default SalesHistory;
