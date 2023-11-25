const express = require('express');
const router = express.Router();

//controller
const {
    placeOrder,
    gcash_webhook
} = require('../../controller/customer/orders');

//middleware
const  {
    authenticateToken
} = require('../../middleware/client')


router.post('/place-order', authenticateToken, placeOrder);
router.post('/gcash_webhook', gcash_webhook);


module.exports = router;


