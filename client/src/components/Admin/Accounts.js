import React from 'react';


const table = () => {
  return (
    <div>
        {/* <AdminNavbar /> */}
    <div className="container mx-auto p-4 h-screen bg-gray-200">
        
      <div className="overflow-x-auto border-amber-900">
        <h1 className='font-bold text-3xl text-amber-900'>Accounts</h1>
      <table className="min-w-full border border-gray-300 text-sm whitespace-nowrap">
          <thead >
            <tr>
              <th className="border-2 border-amber-900 p-2">ID</th>
              <th className="border-2 border-amber-900 p-2">Email</th>
              <th className="border-2 border-amber-900 p-2">Phone Number</th>
              <th className="border-2 border-amber-900 p-2">Username</th>
              <th className="border-2 border-amber-900 p-2">Firstname</th>
              <th className="border-2 border-amber-900 p-2">Middle Initial</th>
              <th className="border-2 border-amber-900 p-2">Lastname</th>
              <th className="border-2 border-amber-900 p-2">Municipality</th>
              <th className="border-2 border-amber-900 p-2">Brgy</th>
              <th className="border-2 border-amber-900 p-2">Street & House#</th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-amber-900 p-2">1</td>
              <td className="border border-amber-900 p-2">balite@yahoo.com</td>
              <td className="border border-amber-900 p-2">092939273164</td>
              <td className="border border-amber-900 p-2">maudrei14</td>
              <td className="border border-amber-900 p-2">Lee Andrei</td>
              <td className="border border-amber-900 p-2">G.</td>
              <td className="border border-amber-900 p-2">Balite</td>
              <td className="border border-amber-900 p-2">Pagsanjan</td>
              <td className="border border-amber-900 p-2">Poblacion 1</td>
              <td className="border border-amber-900 p-2">04-241 Kanto Tinyo</td>
            </tr>
           
            
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default table;
