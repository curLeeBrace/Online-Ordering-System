const express = require('express');
const router = express.Router();

const {createAccount} = require('../controller/account');


router.post('/create', createAccount);


module.exports = router;