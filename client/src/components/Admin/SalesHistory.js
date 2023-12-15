import React, { useState , useEffect} from 'react';
import { api } from '../../customHooks/configAxios';

import {eachDayOfInterval, startOfWeek, format, startOfMonth} from 'date-fns'
import LoadingPage from '../../Loading';
// import startOfWeek from 'date-fns/startOfWeek'
// import format from 'date-fns/format'
// import startOfMonth from 'date-fns/startOfMonth'
const SalesHistory = () => {
  const [selectedOption, setSelectedOption] = useState('All');
  const [completedOrders, setCompletedOrders] = useState(null);
  const [salesStorage, setSalesStorage] = useState(null);

  useEffect(()=>{
      api.get('/admin/get-completed-orders')
      .then(res => {
        setCompletedOrders(res.data);
        setSalesStorage(res.data);
        console.log(res.data)
      })
      .catch(err => console.error(err));
  },[])

  useEffect(()=>{
    const startDate_ofTheWeek = startOfWeek(new Date(), { weekStartsOn: 1 })
    const startDate_ofTheMonth = startOfMonth(new Date());
    const currentDate = new Date();
    const pattern = "MMMM dd yyyy";

    const FilterSalesThisWeek = (db_dates ,array) => {

      const result = eachDayOfInterval({
        start: startDate_ofTheWeek,
        end: currentDate
      })
      
        const filterArray = array.filter((_,index) => {
        for (let i = 0; i < result.length; i++) {
          // console.log(i)
          // console.log("DB date - ", db_dates[index], " Result : ", format(result[i], pattern));
          if (db_dates[index] === format(result[i], pattern)) {
            
            return true;
          }
          
        }
    })
    console.log("Sales This Week ", filterArray);

    return filterArray;
    }



    

    const FilterSalesThisDay = (db_dates ,array) => {
        const filterArray = array.filter((_, index) => db_dates[index] === format(currentDate, pattern));

        console.log("Sales This Day ", filterArray);
        return filterArray
    }


   

    
    const FilterSalesThisMonth = (db_dates ,array) => {


      const result = eachDayOfInterval({
        start: startDate_ofTheMonth,
        end: currentDate
      })
      
        const filterArray = array.filter((_,index) => {
        for (let i = 0; i < result.length; i++) {
          // console.log(i)
          console.log("DB date - ", db_dates[index], " Result : ", format(result[i], pattern));
          if (db_dates[index] === format(result[i], pattern)) {
            
            return true;
          }
          
        }
    })
    console.log("Sales This Month ", filterArray);

    return filterArray;
    }











    if(selectedOption === "All"){

      setSalesStorage(completedOrders);


    } else if(selectedOption === "Day") {
        const salesThiDay = completedOrders.map((completedOrder)=>({
          Fname : completedOrder.Fname,
          Lname : completedOrder.Lname,
           Orders : {
                Date : FilterSalesThisDay(completedOrder.Orders.Date, completedOrder.Orders.Date),
                AddsOn : FilterSalesThisDay(completedOrder.Orders.Date, completedOrder.Orders.AddsOn),
                MOD : FilterSalesThisDay(completedOrder.Orders.Date, completedOrder.Orders.MOD),
                MTname : FilterSalesThisDay(completedOrder.Orders.Date, completedOrder.Orders.MTname),
                Price : FilterSalesThisDay(completedOrder.Orders.Date, completedOrder.Orders.Price),
                Qty : FilterSalesThisDay(completedOrder.Orders.Date, completedOrder.Orders.Qty),
                Size : FilterSalesThisDay(completedOrder.Orders.Date, completedOrder.Orders.Size),
                Status : FilterSalesThisDay(completedOrder.Orders.Date, completedOrder.Orders.Status),
                Total : FilterSalesThisDay(completedOrder.Orders.Date, completedOrder.Orders.Total),
                
           },

        }))

        setSalesStorage(salesThiDay);
    } else if(selectedOption === "Week") {

      


      const salesThisWeek = completedOrders.map((completedOrder) => ({
        Fname : completedOrder.Fname,
        Lname : completedOrder.Lname,
         Orders : {
              Date : FilterSalesThisWeek(completedOrder.Orders.Date, completedOrder.Orders.Date),
              AddsOn : FilterSalesThisWeek(completedOrder.Orders.Date, completedOrder.Orders.AddsOn),
              MOD : FilterSalesThisWeek(completedOrder.Orders.Date, completedOrder.Orders.MOD),
              MTname : FilterSalesThisWeek(completedOrder.Orders.Date, completedOrder.Orders.MTname),
              Price : FilterSalesThisWeek(completedOrder.Orders.Date, completedOrder.Orders.Price),
              Qty : FilterSalesThisWeek(completedOrder.Orders.Date, completedOrder.Orders.Qty),
              Size : FilterSalesThisWeek(completedOrder.Orders.Date, completedOrder.Orders.Size),
              Status : FilterSalesThisWeek(completedOrder.Orders.Date, completedOrder.Orders.Status),
              Total : FilterSalesThisWeek(completedOrder.Orders.Date, completedOrder.Orders.Total),
              
         },
        

        

      }))

      setSalesStorage(salesThisWeek);
      
      // console.log("Result", result);
      // const filteredDate = completedOrders.map((completedOrder)=>{

      //   completedOrder.Orders.Date.filter((db_date, index) => new Date(db_date) === new Date(result[3]))

      // })


        // console.log("Filtered Date : ", filteredDate);



    } else {


      const salesThisMonth = completedOrders.map((completedOrder) => ({
        Fname : completedOrder.Fname,
        Lname : completedOrder.Lname,
         Orders : {
              Date : FilterSalesThisMonth(completedOrder.Orders.Date, completedOrder.Orders.Date),
              AddsOn : FilterSalesThisMonth(completedOrder.Orders.Date, completedOrder.Orders.AddsOn),
              MOD : FilterSalesThisMonth(completedOrder.Orders.Date, completedOrder.Orders.MOD),
              MTname : FilterSalesThisMonth(completedOrder.Orders.Date, completedOrder.Orders.MTname),
              Price : FilterSalesThisMonth(completedOrder.Orders.Date, completedOrder.Orders.Price),
              Qty : FilterSalesThisMonth(completedOrder.Orders.Date, completedOrder.Orders.Qty),
              Size : FilterSalesThisMonth(completedOrder.Orders.Date, completedOrder.Orders.Size),
              Status : FilterSalesThisMonth(completedOrder.Orders.Date, completedOrder.Orders.Status),
              Total : FilterSalesThisMonth(completedOrder.Orders.Date, completedOrder.Orders.Total),
              
         },

      }))

      setSalesStorage(salesThisMonth);

    }

    // console.log("Date to be filter", requireDate);

  }, [selectedOption])

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
              value="All"
              checked={selectedOption === 'All'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            All
          </label>
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
         {completedOrders !== null ? 
                   <table className="min-w-full border border-gray-300 text-sm mt-4">

                   {/* column */}
                   <thead>
                     <tr>
                       {/* <th className="border p-2">Customer Name</th> */}
                       <th className="border p-2">Date</th>
                       <th className="border p-2">Flavor</th>
                       <th className="border p-2">AddsOn</th>
                       <th className="border p-2">Quantity</th>
                       <th className="border p-2">Size</th>
                       <th className="border p-2">Price</th>
                       <th className="border p-2">Total</th>
                       <th className="border p-2">Payment Method</th>
                     </tr>
                   </thead>
                   {/* rows */}
                   <tbody>
                     {
         
                    
                     
         
         
         
                       salesStorage.map((sale, outer_index) => (
                       // console.log("orders", completedOrder.Fname, " ", outer_index)
                       sale.Orders.Status.map((_, inner_index)=>{
                           return (
                             <tr key={inner_index}>
                             {/* <td className="border p-2">{sale.Fname + " " + sale.Lname}</td> */}
                             <td className="border p-2">{sale.Orders.Date[inner_index]}</td>
                             <td className="border p-2">{sale.Orders.MTname[inner_index]}</td>
                             <td className="border p-2">{sale.Orders.AddsOn[inner_index]}</td>
                             <td className="border p-2">{sale.Orders.Qty[inner_index]}</td>
                             <td className="border p-2">{sale.Orders.Size[inner_index]}</td>
                             <td className="border p-2">{sale.Orders.Price[inner_index]}</td>
                             <td className="border p-2">{sale.Orders.Total[inner_index]}</td>
                             <td className="border p-2">{sale.Orders.MOD[inner_index]}</td>
           
                           </tr>
                           
                           )
               
                         
                       })
         
                       
                     ))}
                   </tbody>
                 </table> :<LoadingPage/>
         
         
         }

      
      </div>
      </div>
    </div>
  );
};

export default SalesHistory;
