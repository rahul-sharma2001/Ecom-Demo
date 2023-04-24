const express = require('express');
const router = express.Router()
const controllers = require('../controllers/cart')

router.post('/',controllers.createCart)
router.post('/:userId',controllers.addProductToCart);
router.get('/:userId',controllers.getCart);


module.exports = router