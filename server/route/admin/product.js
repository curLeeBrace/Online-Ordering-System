const express = require('express');
const router = express.Router();
const uploadImage = require('../../middleware/uploadImage');

//controller
const {
    addProduct ,
    getAllProduct,
    deleteProduct
} = require('../../controller/admin/product');

router.post('/add', uploadImage.single("Image"), addProduct);

router.get('/getAll', getAllProduct);
router.post('/delete', deleteProduct);

module.exports = router;