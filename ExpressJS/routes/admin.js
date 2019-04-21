const path = require('path')
const express = require('express')
const router = express.Router()

const adminController = require('../controllers/admin')

const products = [];

router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postAddProduct);

exports.routes = router;
exports.products = products;
