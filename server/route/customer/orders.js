const express = require('express');
const router = express.Router();

//controller
const {
    placeOrder,
} = require('../../controller/customer/orders');

//middleware
const  {
    authenticateToken
} = require('../../middleware/client')


router.post('place-order', authenticateToken, placeOrder);


