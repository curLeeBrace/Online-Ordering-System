const express = require('express');
const router = express.Router();

const {createUser, getAlluser} = require('../controller/user');

router.post('/', createUser);

router.get('/list', getAlluser);

module.exports = router;