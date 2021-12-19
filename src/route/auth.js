const express = require('express');
const router = express.Router()
const isLogin = require('../app/middlewares/checkLogin')
const AuthController = require('../app/controllers/AuthController')

router.get('/', isLogin, AuthController.Next);
router.post('/login', AuthController.LoginHandler);
router.post('/register', AuthController.RegisterHandler);

module.exports = router