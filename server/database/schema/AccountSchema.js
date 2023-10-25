const mongoose = require('mongoose');

//databse schema
const AccountSchema= new mongoose.Schema({

        Email : {type : String, required : true, unique : true},
        Pnumber : {type : String, required : true, unique : true},
        Uname : {type : String, required : true, unique : true},
        Fname : {type : String, required : true},
        Mname : {type : String, required : true},
        Lname : {type : String, required : true},
        Municipality : {type : String, required : true},
        Brgy : {type : String, required: true},
        Street_N_House : {type : String, required : true},
        Password : {type : String, required : true},
        code  : {type : String, required : true}, 
        verified : {type : Boolean, default : false},
  

});

module.exports = mongoose.model('Account', AccountSchema);