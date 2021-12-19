const express = require('express');
const router = express.Router()
const isLogin = require('../app/middlewares/checkLogin')
const checkXss = require('../app/middlewares/checkXss')
// const permissionDeleteComment = require('../app/middlewares/permissionDeleteComment.js')
// const permissionEditComment = require('../app/middlewares/permissionEditComment.js')

const CommentController = require('../app/controllers/CommentController')

router.post('/', isLogin, checkXss, CommentController.addComment);
router.post('/delete-comment', isLogin, CommentController.deleteComment);
router.put('/', isLogin, checkXss, CommentController.editComment);

module.exports = router