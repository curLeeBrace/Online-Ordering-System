import { Fragment, useEffect, useState } from "react";
import { useOrder } from "../../customHooks/context/order_context";
import { api } from "../../customHooks/configAxios";

const CustomerInfo = ({thClass, customerData, setIsOrderDetailsOpen}) => {
    
    const [Brgy, setBrgy] = useState(null);
    const [Street_N_House, setStreet_N_House] = useState(null);
    const [Municipality, setMunicipality] = useState(null);
    const order = useOrder();
    // const [Orders, setOrders] = useState(null);
    // const [index, setIndex] = useState(0);
    useEffect(()=>{
        const {Brgy, Street_N_House, Municipality} = customerData.Address;
     
        setBrgy(Brgy); 
        setStreet_N_House(Street_N_House); 
        setMunicipality(Municipality);

    },[])

    const seeOrders = async () => {
      
        const {OrderID} = customerData;
        //fetch orders data...
        api.post('/admin/get-customer-orders', {orderID : OrderID})
        .then(data => {
          order.setOrder(data.data);
          setIsOrderDetailsOpen(true)
          
        })
        .catch(err => console.error(err));

    }


    

    return (
    <>
      <tr>
        <td className={thClass}>{customerData.OrderID}</td>
        <td className={thClass}>{`${customerData.Fname} ${customerData.Lname}`}</td>
        <td className={thClass}>{`${Brgy} ${Street_N_House} ${Municipality}`}</td>
        <td className={thClass}>
          <button
            className="bg-lime-900 font-bold text-white px-2 py-0 ml-0 mt-0 rounded hover:bg-lime-700 focus:outline-none"
            onClick={seeOrders}
          >
            View Details
          </button>
        </td>
      </tr>
    </>
  );
};

export default CustomerInfo;
