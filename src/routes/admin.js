const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.get('/productmanage', adminController.productmanage);
router.get('/productmanage/addnewproduct', adminController.addform);

router.post('/productmanage/deleteproduct', adminController.deleteproduct);
router.post('/productmanage/addnewproduct/store', adminController.store);
router.post(
  '/productmanage/changestatusproduct',
  adminController.changeprostatus,
);

router.get('/', adminController.productmanage);

module.exports = router;
