const UserInfoSchema =  require('../../database/schema/User/UserInfoSchema');
module.exports = (io, socket) => {



    //event will be emit
    const getAllAvailableDelivery = async () => {
        // get the customer data...
        const customerDatas = await UserInfoSchema.aggregate([
            {$lookup : {from : 'addresses', localField : 'AddressID', foreignField : '_id', as : 'Address'}},
            {$lookup : {from : 'orders', localField : 'OrderID', foreignField : '_id', as : 'Orders'}},
            {$unwind: '$Orders'},
            {$unwind: '$Address'},
            ]).exec();
        
            //possible aproach to handle or display or pass it to customer order in Admin Interface..
            // store it to the customerData to array if had OrderID,
        
            const filtered_customerDatas = customerDatas.filter((customerData => {
                let had_new_order = false;

                for (let index = 0; index < customerData.Orders.Status.length; index++) {
                    const status = customerData.Orders.Status[index];
                    if(status == 1){
                        had_new_order = true;  
                    }
                }
                return customerData.OrderID !== null && had_new_order == true;
        
            }))
        
            //  console.log("Filtered! Data!", filtered_customerDatas)
            //  console.log("Length is : ", filtered_customerDatas.length);
            //possible respnse is object of address and object of orders...
            return filtered_customerDatas;
        }

        
        getAllAvailableDelivery()
        .then(data =>  socket.emit('delivery:get-avilable', data))
        .catch(err => console.error(err));
       

}