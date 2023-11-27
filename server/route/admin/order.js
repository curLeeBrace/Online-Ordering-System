const express = require('express');
const router = express.Router();

//controller
const {confirmOrder,getAllOrders} = require('../../controller/admin/order');

router.post('/get-customer-orders', getAllOrders);
router.post('/confirm-order', confirmOrder);


module.exports = router;