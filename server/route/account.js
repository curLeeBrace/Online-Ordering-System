const express = require('express');
const router = express.Router();

const {
    createAccount, 
    verifyAccount, 
    requestVerificationCode, 
    confirmVerificationCode,
    updatePass
} = require('../controller/account');


router.post('/create/:userType', createAccount);
router.post('/verifyAccount',verifyAccount);
router.post('/requestVerification', requestVerificationCode);
router.post('/confirmVerificationCode', confirmVerificationCode);
router.post('/updatePass', updatePass);

module.exports = router;