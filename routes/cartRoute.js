const router = require('express').Router();
const cartController = require('../controllers/cartController');
const {verifyToken, verifyUser, verifyAdmin} = require('../middlewares/auth');

router.get('/cart', verifyAdmin, cartController.getCarts);
router.get('/cart/:userId', verifyUser ,cartController.getUserCart);
router.post('/cart', verifyToken, cartController.createCart);
router.put('/cart', verifyToken, cartController.addToCart);
router.delete('/cart/:id', verifyToken, cartController.deleteCart);

module.exports = router;
