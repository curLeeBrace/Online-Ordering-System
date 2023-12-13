const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');



const DeliveriesSchema = new mongoose.Schema({

    RaiderUname : {type : String, required : true},
    MajorIndex : [[{type : Number, required : true}]],
    MyDelivery : [{type : ObjectId, required : true}], //userId
    // Proof_ofDelivery : [{type : String, required : true}]

})

module.exports = mongoose.model('Deliveries', DeliveriesSchema);