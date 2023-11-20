const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

//databse schema
const AccountSchema = new mongoose.Schema({

  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Type : {type : String, required : true},
  code: { type: String, required: true },
  verified: { type: Boolean, default: false },

});

module.exports = mongoose.model("Account", AccountSchema);
