//socket controller
const {getAllCustomers, confirmOrder} = require('../../controller/admin/order')


module.exports = (io, socket) => {
  
        //get the updated available customers
        getAllCustomers()
        .then(data => {
            
            // console.log("customer get!");
            socket.emit('order:list', data);
        })
        .catch(err => console.log(err))
        

        

        //update order to order confirmed!
        const confirmHandler = (orderID, index, callback) => {
           
            confirmOrder(orderID, index)
            .then(res => {
                const {updatedStatus, index} = res;
                console.log("order confirmed!");
                //then call the vent of get:order to update the interface of customer in, her order page
                console.log("confirm respones, ", res);
                io.of("/customer").emit('order:update', index, updatedStatus);

                
                callback(res);
            })
            .catch(err => console.log(err))
        }

        //event
        socket.on("order:confirmed", confirmHandler);
       

}