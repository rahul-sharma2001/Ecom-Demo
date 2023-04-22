const express = require('express');
const router = express.Router();
const controllers = require('../controllers/product')

router.post('/',controllers.addProduct);
router.get('/',controllers.getAllProducts);
router.put('/:productId',controllers.updateProduct);
router.delete('/:productId',controllers.deleteProduct);

module.exports = router