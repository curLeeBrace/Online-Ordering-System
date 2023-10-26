const AccountSchema = require("../database/schema/AccountSchema");
const verifyEmail = require("../utils");
let returnNotiff = { notiff: null };
const minm = 100000; 
const maxm = 999999; 

const createAccount = async (req, res) => {

  try {
    let codeGenerator = Math.floor(Math .random() * (maxm - minm + 1)) + minm;
    const {
      Email: clientEmail,
      Pnumber: clientPhoneNum,
      Uname: clientUsername,
     
    } = req.body;
      req.body.code = codeGenerator.toString();
  
    const accountData = await AccountSchema.findOne({
      $or : [{Email : clientEmail}, {Pnumber : clientPhoneNum}, {Uname : clientUsername}]
    }).exec(); //search if email is existing
    console.log(accountData);

    
    if (accountData !== null) {
      const { Email: email, Pnumber: phoneNum, Uname: username } = accountData;

      if (clientEmail === email) {
        returnNotiff.notiff = "Email is already in used!";
        return res.json(returnNotiff);
      } 
      else if (clientPhoneNum === phoneNum) {
        returnNotiff.notiff = "PhoneNumber is already in used!";
        return res.json(returnNotiff);
      } 
      else if (clientUsername === username) {
        returnNotiff.notiff = "Username is already existing!";
        return res.json(returnNotiff);
      }
    } 
    else {
      await AccountSchema.create(req.body); // inserData to database
      verifyEmail(clientEmail, codeGenerator.toString());
      return res.status(200).json({ sucsess: true });
    }

   
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  createAccount,
};
