const {getAllCustomers} = require('../../controller/admin/order'); //Order of Customer in Admin Interface
const {getCustomerOrders} = require('../../controller/customer/orders'); // Order of Customer in Customer Interface

module.exports = (io, socket) => {
    //event for placing  order 
    const placeOrder = (payload) => {
      
            // console.log(payload);  // this socket will recieve "place order"!
    
            getAllCustomers()
            .then(data => {
                io.of("/admin").emit('order:list', data);

            })
            .catch(err => console.log(err))  
        
    }



    //get cutomer orders
    const getOrder = (payload, callback) => {
        
        getCustomerOrders(payload)
        .then(res => {  
            // console.log("response Data", res)
           
            callback(res);  

        })
        .catch(err => console.error(err))

    }


    
    // const updateOrder = (arg) => {
    //     console.log("OrderUpdate")
    //     getCustomerOrders(arg)
    //     .then(res => {  
    //         // console.log("response Data", res)
            
    //         callback(res);

    //     })
    //     .catch(err => console.error(err))
    // }


    socket.on('order:place', placeOrder);
    socket.on('order:get', getOrder);
    // socket.emit('order:update', updateOrder);


}