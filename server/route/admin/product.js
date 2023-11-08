const express = require('express');
const router = express.Router();
const uploadImage = require('../../middleware/uploadImage');

//controller
const {addProduct} = require('../../controller/admin/product');

router.post('/add', uploadImage.single("Image"), addProduct);
module.exports = router;