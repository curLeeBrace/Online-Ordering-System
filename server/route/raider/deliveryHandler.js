const express = require('express');
const router = express.Router();
const uploadImage = require('./../../middleware/uploadProof');
const {getAllOrders, acceptDeliver, getAllDeliveries, uploadProof} = require('../../controller/raider/deliveryHandler');


router.post('/get-orders', getAllOrders);
router.post('/accept-deliver', acceptDeliver);
router.post('/get-allDelivery', getAllDeliveries);
router.post('/upload-proof', uploadImage.single("Image"), uploadProof);

module.exports = router;