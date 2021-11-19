const router = require('express').Router();
const productController = require('../controllers/productController');
const {verifyToken, verifyAdmin} = require('../middlewares/auth');

router.get('/product', verifyToken, productController.getProducts);
router.get('/product/:id', verifyToken , productController.getProduct);
router.post('/product', verifyAdmin ,productController.createProduct);
router.put('/product/:id', verifyAdmin, productController.updateProduct);
router.delete('/product/:id', verifyAdmin, productController.deleteProduct);

module.exports = router;
