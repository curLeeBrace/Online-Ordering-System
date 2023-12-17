const express = require('express');
const router = express.Router();

//controller
const {
    placeOrder,
    gcash_webhook,
    getCustomerOrders,
    cancelOrder,
    giveFeedBack,
} = require('../../controller/customer/orders');

//middleware
const  {
    authenticateToken
} = require('../../middleware/client')


router.post('/place-order', authenticateToken, placeOrder);
router.post('/gcash_webhook', gcash_webhook);
router.post('/get-customer-order', getCustomerOrders);
router.post('/cancel-order', cancelOrder);
router.post('/submit-feedback', giveFeedBack);

module.exports = router;


