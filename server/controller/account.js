require('dotenv').config();
const jwt = require('jsonwebtoken');
const AccountSchema = require("../database/schema/AccountSchema");
const verifyEmail = require("../utils");
let returnNotiff = { notiff: null };
const minm = 100000; 
const maxm = 999999; 
let codeGenerator = Math.floor(Math .random() * (maxm - minm + 1)) + minm;

const createAccount = async (req, res) => {

  try {
    const {
      Email: clientEmail,
      Pnumber: clientPhoneNum,
      Uname: clientUsername,
     
    } = req.body;

    console.log(clientEmail);
      req.body.code = codeGenerator.toString();
    
    const {userType} = req.params; // get userType
  
    const accountData = await AccountSchema.findOne({
      $or : [{Email : clientEmail}, {Pnumber : clientPhoneNum}, {Uname : clientUsername}]
    }).exec(); //search if email is existing
    console.log(accountData);

    
    if (accountData !== null) {
      const { Email: email, Pnumber: phoneNum, Uname: username, verified : verified } = accountData;

        if(clientEmail === email) {
          
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
      let accountData = req.body;
      accountData['Type'] = userType;
      const sendEmail = verifyEmail(clientEmail, codeGenerator.toString());
      if(sendEmail) {
        await AccountSchema.create(accountData); // inserData to database
        
        return res.status(200).json({ sucsess: true });
      } else {
        res.senStatus(400); // failed to send email
      }
     
    }

   
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};



const verifyAccount = async (req, res) => {
  try {
    const {email:clientEmail, code : client_code} = req.body;
    const account = await AccountSchema.findOne({Email : clientEmail});
    const {code : db_code} = account;
    let returnNotiff;
    if(client_code === db_code) {

      await AccountSchema.findOneAndUpdate({Email : clientEmail},{verified : true, code : ""});
      returnNotiff = "Email Verified!";
      return res.json({notiff : returnNotiff, sucsess : true});
    } 

    returnNotiff = "Invalid Code!";
    return res.json({notiff : returnNotiff, sucsess : false});

  } catch (error) {
    console.log(error);
  }
}
const requestVerificationCode = async (req, res) =>{
  let notiff = ""
  let getCode = codeGenerator.toString();
  try {
    const {email : clientEmail} = req.body;
    console.log(clientEmail);
    const accountData = await AccountSchema.findOne({
      $and : [{Email : clientEmail}, {verified : true}]
    });

    if(accountData !== null){
     
      await AccountSchema.findOneAndUpdate({Email : clientEmail},{code : getCode});
      const sendVerificationCode = verifyEmail(clientEmail, getCode);
        if(sendVerificationCode){
          notiff = "Code was sent to your Email!";

          return res.json({
            notiff : notiff, 
            sucsess : true,
            cookies : {
              email : clientEmail,
              verification : true
            }
          });
          
        }
        return res.sendStatus(500);
      }
      
    notiff = "Invalid Email!"
    return res.json({notiff : notiff, sucsess : false});
  } catch (error) {
    console.log(error)
  } 
}


const confirmVerificationCode = async (req, res) =>{
  const {email, clientCode} = req.body;
  let notiff = "";

  try {
    const accountData = await AccountSchema.findOne({Email : email});
    const db_code = accountData.code;

    if(clientCode === db_code) {
      notiff = "You can now change your password!"
      return res.json({
        notiff : notiff,
        sucsess : true,
        cookies : {
          setNewPass : true
        }
      
      })
    }
    notiff = "Invalid Code!"
    return res.json({
      notiff : notiff,
      sucsess : false
    })

    
  } catch (error) {
    console.log(error)
  }
}

const updatePass = async (req, res) => {
  const {email, newPass} = req.body;
  let notiff = "Password succsessfully change!";
  try {
    await AccountSchema.findOneAndUpdate({Email : email},{Password : newPass});
    return res.json({notiff : notiff, sucsess : true});
  } catch (error) {
    console.log(error)
  }
}



const login = async (req, res) => {
  let {user, reqToken, accessToken} = req.body;
  const {email, password} = user;
 
  console.log(user);
  try {
    const accountData = await AccountSchema.findOne({
      $and : [{Email : email}, {Password : password}]
    });

    if(accountData != null){
      if(!reqToken) {
        accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);   
      }
      return res.json({
          account : "valid", 
          token : accessToken, 
          userType : accountData.Type,
          clientName : accountData.Uname
    });
    }
    return res.json({account : "invalid"});
  } 
  catch (error) {
    console.log(error);
  }

}





module.exports = {
  createAccount,
  verifyAccount,
  requestVerificationCode,
  confirmVerificationCode,
  updatePass,
  login,
};
