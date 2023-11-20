require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        
        if(err) return res.sendStatus(403);
          
         req.body.user = user; // set user that contains email and password after verifying webToken to req body
         next();
        
      }) 
       
  }

  module.exports = {
    authenticateToken,
  }