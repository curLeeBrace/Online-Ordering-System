const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadLicense')
//controller
const {
    createAccount, 
    verifyAccount, 
    requestVerificationCode, 
    confirmVerificationCode,
    updatePass,
    login,
    uploadLicense
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
router.post('/upload-license', upload.single('license'), uploadLicense);




module.exports = router;