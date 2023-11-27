const UserInfoSchema = require('../../database/schema/User/UserInfoSchema');
const OrderSchema = require('../../database/schema/User/OrdersSchema');


const getAllCustomers = async () => {
   // get the customer data... (will be use soon in fetching customerd Order data in admin side)
  const customerDatas = await UserInfoSchema.aggregate([
      {$lookup : {from : 'addresses', localField : 'AddressID', foreignField : '_id', as : 'Address'}},
      {$unwind: '$Address'},]).exec();

    //possible aproach to handle or display or pass it to customer order in Admin Interface..
    // store it to the customerData to array if had OrderID,

    const filtered_customerDatas = customerDatas.filter((customerData => {
        
    return customerData.OrderID !== undefined;

    }))

    //  console.log("Filtered! Data!", filtered_customerDatas)
    //  console.log("Length is : ", filtered_customerDatas.length);
    //possible respnse is object of address and object of orders...
    return filtered_customerDatas;
}

const getAllOrders = async (req, res) => {
  const {orderID} = req.body;
  console.log("req  ",req.body)
  console.log("orderID : ", orderID);
  try {
    const orders = await OrderSchema.findById(orderID).exec();
    // console.log(orders)
    return res.json(orders);
    
  } catch (error) {
    console.error(error);
  }

}

const confirmOrder = async (req, res) => {
    const {orderID, index} = req.body;
    
    try {
        const updateStatus = await OrderSchema.findByIdAndUpdate(orderID, {[`Status.${index}`]: 1});
        console.log(updateStatus);
        
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
    }

}

module.exports = {getAllCustomers, confirmOrder, getAllOrders};