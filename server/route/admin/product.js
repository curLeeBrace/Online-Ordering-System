const express = require('express');
const router = express.Router();
const uploadImage = require('../../middleware/uploadImage');

//controller
const {
    addProduct ,
    getAllProduct
} = require('../../controller/admin/product');

router.post('/add', uploadImage.single("Image"), addProduct);

router.get('/getAll', getAllProduct);

module.exports = router;