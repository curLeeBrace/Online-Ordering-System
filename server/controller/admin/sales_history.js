const UserInfoSchema = require('../../database/schema/User/UserInfoSchema');


const getCompletedOrders = async(req, res) => {

try {
    const userInfos = await UserInfoSchema.aggregate([
        {$lookup : {from : 'orders', localField : 'OrderID', foreignField : '_id', as : 'Orders'}},
        {$unwind: '$Orders'},
      ]).exec();
    
    const filter_userInfo = userInfos.filter((userInfo)=> {return userInfo != null}) //get all the user that has order ID
    
    // return order that status of 5 which is order completed
    const result = filter_userInfo.map(user => ({
        Fname : user.Fname,
        Lname : user.Lname,
        Orders : {
            Status : user.Orders.Status.filter(status => status === 5),
            MTname : user.Orders.MTname.filter((_, index) => user.Orders.Status[index] === 5),
            Size : user.Orders.Size.filter((_, index) => user.Orders.Status[index] === 5),
            Price : user.Orders.Price.filter((_, index) => user.Orders.Status[index] === 5),
            AddsOn : user.Orders.AddsOn.filter((_, index) => user.Orders.Status[index] === 5),
            Qty : user.Orders.Qty.filter((_, index) => user.Orders.Status[index] === 5),
            Total : user.Orders.Total.filter((_, index) => user.Orders.Status[index] === 5),
            MOD : user.Orders.MOD.filter((_, index) => user.Orders.Status[index] === 5),
            Date : user.Orders.Date.filter((_, index) => user.Orders.Status[index] === 5),
        }
    }));
    
    return res.json(result);

} catch (error) {
    console.error(error);
}


}



module.exports = {getCompletedOrders};