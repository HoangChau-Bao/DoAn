const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductsController');

router.get('/:slug', productController.showdetail);

module.exports = router;
