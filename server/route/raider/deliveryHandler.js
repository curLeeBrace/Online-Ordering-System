const express = require('express');
const router = express.Router();

const {getAllOrders, acceptDeliver, getAllDeliveries} = require('../../controller/raider/deliveryHandler');


router.post('/get-orders', getAllOrders);
router.post('/accept-deliver', acceptDeliver);
router.post('/get-allDelivery', getAllDeliveries);

module.exports = router;