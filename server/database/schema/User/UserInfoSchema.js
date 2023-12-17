const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');


const UserInfoSchema = new mongoose.Schema({
    Uname : {type : String, required : true, unique : true},
    Fname : {type : String, required : true},
    Mname : {type : String, required : true},
    Lname : {type : String, required : true},
    Pnumber : {type : String, required : true, unique : true},
    DriverLicense : {type : String},
    AccountID : {type : ObjectId, required : true},
    AddressID : {type : ObjectId, required : true},
    OrderID : {type : ObjectId, default : null}
    
})

module.exports = mongoose.model('UserInfo',UserInfoSchema);