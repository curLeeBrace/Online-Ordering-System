require('dotenv').config();
const jwt = require('jsonwebtoken');
const AccountSchema = require("../database/schema/User/AccountSchema");
const AddressSchema = require("../database/schema/User/AddressSchema");
const UserInfoSchema = require("../database/schema/User/UserInfoSchema")
const verifyEmail = require("../utils");
let returnNotiff = { notiff: null };
const minm = 100000; 
const maxm = 999999; 
let codeGenerator = Math.floor(Math .random() * (maxm - minm + 1)) + minm;

const createAccount = async (req, res) => {
  let {
    Email,
    Pnumber,
    Uname,
    Fname,
    Mname,
    Lname,
    Municipality,
    Brgy,
    Street_N_House,
    Password,
  } = req.body;

  Pnumber = "0"+Pnumber;

  req.body.code = codeGenerator.toString();
  
  const {userType} = req.params; // get userType

  //=======For UserInfoSchema=============
  const userInfoDataSchema = {
    Uname,
    Fname,
    Mname,
    Lname,
    Pnumber,
  }
  //=======For AccountSchema==============
  const accountDataSchema = {
    Email,
    Password,
    code : codeGenerator,

  };
  //=======For AddressSchema============
  const addressDataSchema = {
    Municipality,
    Brgy,
    Street_N_House
  }
  
  
 
  
  try {
    
    
    // willl fixe this structure later -- di na na fix ampotek HAHAHHAHHAH
    const accountData = await AccountSchema.findOne({Email : Email}).exec(); //search if email is existing

    const userData = await UserInfoSchema.findOne({
      $or : [{Pnumber : Pnumber}, {Uname : Uname}]
    }).exec();
   

    //===================Validation==============================
    if (accountData !== null) {
      
      const { Email: email, verified : verified } = accountData;
     
        if(Email === email) {
          
          returnNotiff.notiff = "Email is already in used!";
          return res.json(returnNotiff);
        } 
        

    } else if (userData !== null) {
      const { Pnumber: phoneNum, Uname: username } = userData; 

      if (Pnumber === phoneNum) {
        returnNotiff.notiff = "PhoneNumber is already in used!";
        return res.json(returnNotiff);
      } 
      else if (Uname === username) {
        returnNotiff.notiff = "Username is already existing!";
        return res.json(returnNotiff);
      }

    }
    
    
    else {
     // add userType depends on parametern, either customer or raider 
      const sendEmail = verifyEmail(Email, codeGenerator.toString());

      

      if(sendEmail) {

        //create account
        accountDataSchema['Type'] = userType;
        const acc = await AccountSchema.create(accountDataSchema);
        const addr = await AddressSchema.create(addressDataSchema);
        
        userInfoDataSchema['AccountID'] = acc._id;
        userInfoDataSchema['AddressID'] = addr._id;
        const userInfo = await UserInfoSchema.create(userInfoDataSchema);     

          
        console.log(userInfo);
        
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
 
  // console.log(user);
  try {
    // const accountData = await AccountSchema.findOne({
    //   $and : [{Email : email}, {Password : password}]
    // });

    const accountData = await UserInfoSchema.aggregate([
      {$lookup : { from: 'accounts', localField: 'AccountID', foreignField: '_id', as: 'Account' }},
      {$match : {'Account.Email' : email}},
      {$unwind : '$Account'},
   
    ]).exec();
  
  // console.log(accountData[0].Account[0].Type);
    console.log(accountData)
    if(accountData.length > 0){
      if(password == accountData[0].Account.Password){
       
          if(!reqToken) {
            accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);   
          }
    
          return res.json({
              account : "valid", 
              token : accessToken, 
              userType : accountData[0].Account.Type,
              verified : accountData[0].Account.verified,
              email : accountData[0].Account.Email,
              username : accountData[0].Uname,
        });

      }
      return res.json({account : "invalid"});
    }
    return res.json({account : "invalid"});

  } 
  catch (error) {
    console.log(error);
    // return res.send(error);
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
