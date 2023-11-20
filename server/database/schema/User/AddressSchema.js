const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');



const AddressSchema = new mongoose.Schema({

    Municipality : {type : String, required : true},
    Brgy : {type : String, required: true},
    Street_N_House : {type : String, required : true},
   
    

})

module.exports = mongoose.model('Address', AddressSchema);