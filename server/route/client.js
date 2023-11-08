const express = require('express');
const router = express.Router();

const {
    getUsername,

} =  require('../controller/client');


//middleware
const {
    authenticateToken,
} = require('../middleware/client');








router.get('/getUsername',authenticateToken, getUsername);

module.exports = router;