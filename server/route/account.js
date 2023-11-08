const express = require('express');
const router = express.Router();
//controller
const {
    createAccount, 
    verifyAccount, 
    requestVerificationCode, 
    confirmVerificationCode,
    updatePass,
    login
} = require('../controller/account');

//middleware
const {
    authenticateToken
} = require('../middleware/account')

router.post('/create/:userType', createAccount);
router.post('/verifyAccount',verifyAccount);
router.post('/requestVerification', requestVerificationCode);
router.post('/confirmVerificationCode', confirmVerificationCode);
router.post('/updatePass', updatePass);
router.post('/login',authenticateToken,login);




module.exports = router;