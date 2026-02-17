const express = require('express');
const { getAllProduct, getCategoryProduct, getProductById, getBestsellers } = require('../controllers/productController');
const Product = require('../models/productModel');
const ProductRouter = express.Router();

ProductRouter.get('/products', getAllProduct);
ProductRouter.get('/category/:category', getCategoryProduct);
ProductRouter.get('/product/:id', getProductById);
ProductRouter.get('/bestsellers', getBestsellers);


module.exports = ProductRouter;