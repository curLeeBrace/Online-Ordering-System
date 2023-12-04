const express = require('express');
const router = express.Router();
const {getRaidersInfo, deleteRaiderInfo} = require('../../controller/admin/raider_acc');

router.get('/raider-infos', getRaidersInfo);
router.post('/delete-raider', deleteRaiderInfo);

module.exports = router;
