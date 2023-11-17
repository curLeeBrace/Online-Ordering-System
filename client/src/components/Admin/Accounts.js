import React from 'react';


const table = () => {
  let thClass = 'border-2 border-amber-900 p-2'
  return (
    <div>
        {/* <AdminNavbar /> */}
    <div className="container mx-auto p-4 h-screen bg-gray-200">
        
      <div className="overflow-x-auto border-amber-900">
        <h1 className='font-bold text-3xl text-amber-900'>Accounts</h1>
      <table className="min-w-full border border-gray-300 text-sm whitespace-nowrap">
          <thead >
            <tr>
              <th className={thClass}>ID</th>
              <th className={thClass}>Email</th>
              <th className={thClass}>Phone Number</th>
              <th className={thClass}>Username</th>
              <th className={thClass}>Firstname</th>
              <th className={thClass}>Middle Initial</th>
              <th className={thClass}>Lastname</th>
              <th className={thClass}>Municipality</th>
              <th className={thClass}>Brgy</th>
              <th className={thClass}>Street & House#</th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={thClass}>1</td>
              <td className={thClass}>balite@yahoo.com</td>
              <td className={thClass}>092939273164</td>
              <td className={thClass}>maudrei14</td>
              <td className={thClass}>Lee Andrei</td>
              <td className={thClass}>G.</td>
              <td className={thClass}>Balite</td>
              <td className={thClass}>Pagsanjan</td>
              <td className={thClass}>Poblacion 1</td>
              <td className={thClass}>04-241 Kanto Tinyo</td>
            </tr>
           
            
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default table;
