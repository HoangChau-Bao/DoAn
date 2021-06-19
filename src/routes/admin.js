const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.get('/productmanage', adminController.productmanage);
router.get('/ordermanage', adminController.ordermanage);
router.get('/productmanage/addnewproduct', adminController.addform);
router.get('/ordermanage/orderdetail', adminController.orderdetail);
router.post('/productmanage/deleteproduct', adminController.deleteproduct);
router.post('/productmanage/addnewproduct/store', adminController.store);
router.post(
  '/productmanage/changestatusproduct',
  adminController.changeprostatus,
);
router.post('/confirmbill', adminController.confirmbill);
router.post('/deletebill', adminController.deletebill);
router.get('/', adminController.productmanage);

module.exports = router;
