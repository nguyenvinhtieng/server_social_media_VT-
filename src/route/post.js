const express = require('express');
const router = express.Router()
const isLogin = require('../app/middlewares/checkLogin')
const permissionAccessPost = require('../app/middlewares/permissionAccessPost')
const PostController = require('../app/controllers/PostController')

router.post('/', isLogin, PostController.createPost);
router.put('/', isLogin, permissionAccessPost, PostController.editPost);
router.delete('/:id', isLogin, PostController.deletePost);
router.get('/view/:id', PostController.viewPost);
router.get('/', isLogin, PostController.getTenPost);

module.exports = router