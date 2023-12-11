const express = require('express');
const router = express.Router();

const {getCompletedOrders} = require('../../controller/admin/sales_history');



router.get('/get-completed-orders', getCompletedOrders);


module.exports = router;