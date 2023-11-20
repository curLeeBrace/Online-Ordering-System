const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const OrdersShema = new mongoose.Schema({

    CustomerID : {type : ObjectId, required : true},
    MTname : [{type : String, required : true}],
    Size : [{type : String, required : true}],
    Price : [{type : Number, required : true}],
    AddsOn : [{type : String, required : false}],
    Qty : [{type : Number, required : true}],
    Total : [{type : Number, required : true}],
    MOD : [{type : Number, required : true}],
    Status : [{type : String, required : true}],
    Date : [{type : Date, required : true}] 

});

module.exports = mongoose.model('Orders', OrdersShema);