const express = require('express');
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/auth');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/', verifyToken, authController.confirm);


module.exports = router;