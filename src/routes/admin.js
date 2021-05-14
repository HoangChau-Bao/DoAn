const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.get('/productmanage', adminController.productmanage);
router.post('/productmanage/deleteproduct', adminController.deleteproduct);
router.get('/productmanage/addnewproduct', adminController.addform);
router.post('/productmanage/addnewproduct/store', adminController.store);

module.exports = router;
