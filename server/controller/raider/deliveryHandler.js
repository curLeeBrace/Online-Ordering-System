const OrderSchema = require("../../database/schema/User/OrdersSchema");
const DeliveriesSchema = require("../../database/schema/User/DeliveriesSchema");


//===================================================================================
const filterOrders = (orders, status_value) => {
  let major_index = [];

  orders.Status.filter((_, i) => {
    if (orders.Status[i] === status_value) {
      major_index.push(i);
      return true;
    }
    return false;
  });

  const filter = {
    MajorIndex: major_index,
    Orders: {

      OrderID : orders._id,

      Flavor: orders.MTname.filter(
        (_, i) => orders.Status[i] === status_value
      ),
      AddsOn: orders.AddsOn.filter(
        (_, i) => orders.Status[i] === status_value
      ),
      Qty: orders.Qty.filter(
        (_, i) => orders.Status[i] === status_value
      ),
      Size: orders.Size.filter(
        (_, i) => orders.Status[i] === status_value
      ),
      Price: orders.Price.filter(
        (_, i) => orders.Status[i] === status_value
      ),
      Total: orders.Total.filter(
        (_, i) => orders.Status[i] === status_value
      ),
      MOD: orders.MOD.filter(
        (_, i) => orders.Status[i] === status_value
      ),
    },
  };

  return filter;
};

const filterUserInfo = (orders, status_value) => {
  
}
//==================================================================================
const getAllOrders = async (req, res) => {
  const { orderID } = req.body;
  // console.log("req  ",req.body)
  // console.log("orderID : ", orderID);
  try {
    const orders = await OrderSchema.findById(orderID);
    const availableDelivery = filterOrders(orders, 1);
    // console.log(availableDelivery);

    return res.json(availableDelivery);

  } catch (error) {
    console.error(error);
  }
};



const acceptDeliver = async (req, res) => {

  console.log("Request Body : ", req.body);

  const updateOrderStatus = async (major_index, orderID) => {

    for(let i = 0; i < major_index.length; i++) {
        const index = major_index[i];

        await OrderSchema.findByIdAndUpdate(orderID,{
          $set : {
            [`Status.${index}`]: 2,
          }
        
        });
    }

   



  }

  const {raiderUname, userID, orderID, proof_ofDelivery, major_index} = req.body;
  
  try {
    const query = await DeliveriesSchema.findOne({RaiderUname : raiderUname});
    if(query === null){ // create delivery collectioon

      const createDeliver = await DeliveriesSchema.create({
        RaiderUname : raiderUname,
        MajorIndex : major_index,
        MyDelivery : userID,
        Proof_ofDelivery : proof_ofDelivery,
      });
      
      // console.log(createDeliver);
      // return res.json(createDeliver);

    } else { // just add/push or update the array of a collection
      const addDeliver = await DeliveriesSchema.findOneAndUpdate({RaiderUname : raiderUname},
          {
            $push : {
              MajorIndex : major_index,
              MyDelivery : userID,
              Proof_ofDelivery : proof_ofDelivery,
            }
          } ,
          {new : true}
        
        )
       
        // console.log(addDeliver);
        // return res.json(addDeliver);
    }
    
    updateOrderStatus(major_index, orderID) // update Order Status

    return res.sendStatus(200);
    
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
    
  }



}



const getAllDeliveries = async (req, res) => {
  const  {raider_username} = req.body;
  


  const filterData = (ordersArray, data) => {
    let filteredData = [];
    for (let i = 0; i < ordersArray.length; i++) {
      const order = ordersArray[i];

      for (let j = 0; j < order.Status.length; j++) {
        const status = order.Status[j];

        if(status === 2){
          filteredData.push(data[i]);
        }
        
      }
      
    }

    return filteredData;
  }





  try {


    const customerDatas = await DeliveriesSchema.aggregate([
            {$lookup : {from : 'userinfos', localField : 'MyDelivery', foreignField : '_id', as : 'MyDelivery'}},
            {$lookup : {from : 'orders', localField : 'MyDelivery.OrderID', foreignField : '_id', as : 'Orders'}},
            {$lookup : {from : 'addresses', localField : 'MyDelivery.AddressID', foreignField : '_id', as : 'Address'}},
            // {$unwind : '$Orders'},         
            // {$unwind : '$Address'},
            {$match: { "RaiderUname": raider_username}}
        

            
          ]).exec();

``


    if(customerDatas[0]) {

      //this is wrong algoooooorithmm potekkk
      // ang tama ay gagawa ng bagong array hahahahah mahosai
      //dat gagamit ako filter method... nanamannnn aa..z
      //it took me 1 day... :<
      //okay na

      const orders = filterData(customerDatas[0].Orders, customerDatas[0].Orders);
      const filteredOrders = orders.map((order) => {return filterOrders(order, 2)})
      const userInfo = filterData(customerDatas[0].Orders, customerDatas[0].MyDelivery);
      const address = filterData(customerDatas[0].Orders, customerDatas[0].Address)

    //server will return the customer info, the condtion is wherever the server find the status of 2 display it to client or raider Interface
      
      // return res.json(customerDatas[0]);
      return res.json({
        Orders : filteredOrders,
        UserInfo : userInfo,
        Address : address
      });

  }

  } catch (error) {
    console.error(error);
  }

 
  


} 


module.exports = {getAllOrders, acceptDeliver, getAllDeliveries}