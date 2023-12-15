const UserInfoSchema = require('../../database/schema/User/UserInfoSchema');
const OrderSchema = require('../../database/schema/User/OrdersSchema');


const getAllCustomers = async () => {


  const filterData = (order, data) => {
    let filteredData = null;
    // console.log("Inside Function : ", order)
  
      for (let j = 0; j < order.Status.length; j++) {
        const status = order.Status[j];

        if(status !== 4 && status !==5){
          filteredData = data;
          break;
        }
        
      }
      
    

    return filteredData;
  }



   // get the customer data... (will be use soon in fetching customerd Order data in admin side)
  try {
    let availableOrders = [];
    
    const customerDatas = await UserInfoSchema.aggregate([
        {$lookup : {from : 'addresses', localField : 'AddressID', foreignField : '_id', as : 'Address'}},
        {$lookup : {from : 'orders', localField : 'OrderID', foreignField : '_id', as : 'Orders'}},
        {$unwind: '$Orders'},
        {$unwind: '$Address'},
      ]).exec();

    //possible aproach to handle or display or pass it to customer order in Admin Interface..
    // store it to the customerData to array if had OrderID,

    const filtered_customerDatas = customerDatas.filter((customerData => {
        
      return customerData.OrderID !== null && customerData.OrderID !== undefined;

    }))
    // console.log("Filterded",filtered_customerDatas);

    if(filtered_customerDatas !== null){
      for (let i = 0; i < filtered_customerDatas.length; i++) {
        const filtered_customerData = filtered_customerDatas[i];
        
        availableOrders.push(filterData(filtered_customerData.Orders, filtered_customerData));
      }
    }


    console.log(availableOrders);
    // console.log("Length ", availableOrders.length);

    //  console.log("Filtered! Data!", filtered_customerDatas)
    //  console.log("Length is : ", filtered_customerDatas.length);
    //possible respnse is object of address and object of orders...
    return availableOrders;

  } catch (error) {
      console.error(error);
  }
}





const getAllOrders = async (req, res) => {
  const {orderID} = req.body;
  // console.log("req  ",req.body)
  // console.log("orderID : ", orderID);
  try {
    const query = await OrderSchema.findById(orderID);

    // console.log(query)
    return res.json(query);
    
  } catch (error) {
    console.error(error);
  }

}

const confirmOrder = async (orderID, index, newStatus) => {
  
    try {
        const updateStatus = await OrderSchema.findByIdAndUpdate(orderID, {[`Status.${index}`]: newStatus}, {new : true});
        console.log("Stattus", updateStatus.Status[index]);
        
        return {succsess : true, updatedStatus : updateStatus.Status[index], index : index};
    } catch (error) {
        console.error(error);
    }

}

module.exports = {getAllCustomers, confirmOrder, getAllOrders};