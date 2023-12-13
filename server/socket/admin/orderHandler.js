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
        const confirmHandler = (orderID, index, newStatus,  callback) => {
           
            confirmOrder(orderID, index, newStatus)
            .then(res => {
                const {updatedStatus, index, newStatus} = res;
                console.log("order confirmed!");
                //then call the vent of get:order to update the interface of customer in, her order page
                console.log("confirm respones, ", res);
                io.of("/customer").emit('order:update', index, updatedStatus, newStatus);

                
                callback(res);
            })
            .catch(err => console.log(err))
        }

        //event
        socket.on("order:confirmed", confirmHandler);
       

}