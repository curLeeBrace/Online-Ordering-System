const mongoose = require('mongoose');

//databse schema
const AccountSchema= new mongoose.Schema({
    
            username :{
                type:String,
                required: [true, 'input some data'],
                maxLenght : 20,
            },
            fname : {
                type:String,
                required: [true, 'input some data'],
                maxLenght : 20,
            },
            mname : {
                type:String,
                required: [true, 'input some data'],
                maxLenght : 20,
            },
            lname : {
                type:String,
                required: [true, 'input some data'],
                maxLenght : 20,
            },
  

});

module.exports = mongoose.model('Account', AccountSchema);