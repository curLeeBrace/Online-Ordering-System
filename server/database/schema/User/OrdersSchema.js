const mongoose = require('mongoose');

const OrdersShema = new mongoose.Schema({


    MTname : [{type : String, required : true}],
    Size : [{type : String, required : true}],
    Price : [{type : Number, required : true}],
    AddsOn : [{type : String, required : false}],
    Qty : [{type : Number, required : true}],
    Total : [{type : Number, required : true}],
    Img : [{type : String, required : true}],
    MOD : [{type : String, required : true}],
    Paid : [{type : Boolean, required : true}],
    Status : [{type : Number, required : true}],
    COurl : [{type : String, default : " "}],
    Date : [{type : Date, required : true}] 

});

module.exports = mongoose.model('Orders', OrdersShema);