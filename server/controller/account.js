const AccountSchema = require("../database/schema/AccountSchema");
const verifyEmail = require("../utils");

const createAccount = async (req, res) => {
  let returnNotiff = { notiff: null };
  try {
    const {
      Email: clientEmail,
      Pnumber: clientPhoneNum,
      Uname: clientUsername,
     
    } = req.body;
    // req.body.code = "123456789";
    // await AccountSchema.create(req.body);
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
      // await AccountSchema.create(req.body); // inserData to database
      verifyEmail(clientEmail, "12345");
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
