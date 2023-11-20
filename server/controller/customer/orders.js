const axios = require('axios');
const UserInfoSchema = require('../../database/schema/User/UserInfoSchema');
// const OrdersSchema = require('../../database/schema/User/OrdersSchema');


const placeOrder = async (req, res) => {
    const {user : customer} =  req.body; // contains email and pasword
    const customerData = UserInfoSchema.aggregate([
        {$lookup : {from : '', localField : '', foreignField : '', as : ''}},
        {$match }
    ])
} 





module.exports = {
    placeOrder
}