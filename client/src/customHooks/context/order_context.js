import { useState, useContext, createContext } from "react";

const OrderContext = createContext(null);

export const OrderProvider = ({children}) => {
    //marame pang data lalagay dito soon like, dlient orders.. pero eto muna hehe
    const [orderList, setOrderList] = useState(["default"]);

    const setOrder = (orderList) => {
        setOrderList(orderList);
    }
    const resetOrder = () =>{
        setOrder(null);
    }

    return(
        <OrderContext.Provider value = {{orderList, setOrder, resetOrder}}>

            {children}

        </OrderContext.Provider>
    )

    
}

export const useOrder = () => {
    return useContext(OrderContext);
}

