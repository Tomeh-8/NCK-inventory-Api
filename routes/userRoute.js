const router = require('express').Router();
const userController = require('../controllers/userController');
const {verifyToken} = require('../middlewares/auth');

//welcome
router.get('/', (req , res) => {
    res.send('Welcome to NCK inventory Api');
});

//auth
router.post('/register', userController.register);
router.post('/login',  userController.login);
router.post('/admin', verifyToken , userController.admin);



module.exports = router;