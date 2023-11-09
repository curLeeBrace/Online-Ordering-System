const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    Flavor : {type : String, required : true, unique : true},
    Size : [{type : String, required : true}],
    Price : [{type : Number, required : true}],
    ImageName : {type : String, required : true, unique : true}
});

module.exports = mongoose.model('Product', ProductSchema);