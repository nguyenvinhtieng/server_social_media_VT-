const express = require('express');
const router = express.Router()
const isLogin = require('../app/middlewares/checkLogin')
const checkXss = require('../app/middlewares/checkXss')
const UserController = require('../app/controllers/UserController')
const validUserData = require('../app/middlewares/validUserData')
// const userWasCreate = require('../app/middlewares/userWasCreate')
// const permissionEditUser = require('../app/middlewares/permissionEditUser')

router.put('/', isLogin, checkXss, UserController.updateUser);
router.get('/:slug', UserController.getUser);
// router.get('/', isLogin, UserController.getUser);

module.exports = router