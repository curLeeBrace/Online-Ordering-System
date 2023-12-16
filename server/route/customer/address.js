const express = require('express');
const router = express.Router();



const {updateAddress} = require('../../controller/customer/address');

router.post('/update-address', updateAddress);

module.exports = router;
