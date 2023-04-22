const express = require('express');
const router = express.Router();
const productRoutes = require('./product');
const userRoutes = require('./user')
const cartRoutes= require('./cart');

router.use('/product',productRoutes)
router.use('/user',userRoutes)
router.use('/cart',cartRoutes);

module.exports = router ;