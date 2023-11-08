require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
          req.body.reqToken = false;
          req.body.accessToken = null;
          next(); 
        } else {
          req.body.reqToken = true;
          req.body.accessToken = token;
          req.body.user = user;
          
          next();
        }
      }) 
 
       
  }

  module.exports = {
    authenticateToken,
  }