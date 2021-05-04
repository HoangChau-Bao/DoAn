const express = require('express');
const router = express.Router();

const voucherController = require('../app/controllers/VoucherController');

router.get('/addvoucher', voucherController.add);
router.post('/store', voucherController.store);
router.get('/:slug', voucherController.show);

module.exports = router;
