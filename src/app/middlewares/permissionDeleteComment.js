const Comment = require('../models/Comment')
const Post = require('../models/Post')
async function permissionDeleteComment(req, res, next) {
    const { _id } = req.body;
    let userid = req._id
    const comment = await Comment.findById(_id)
    if (!comment) return res.json({ success: false, message: "Comment not found!" })
    const post = await Post.findById(comment.postid)
    if (!post) return res.json({ success: false, message: "Post not found!" })
    if (userid != comment.userid && userid != post.userid) return res.json({ success: false, message: "You don't have permission to delete this comment" })
    next()
}
module.exports = permissionDeleteComment