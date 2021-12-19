const Comment = require('../models/Comment')
async function permissionEditComment(req, res, next) {
    let { _id } = req.body
    let userid = req._id
    const comment = await Comment.findById(_id)
    if (!comment) return res.json({ success: false, message: "Comment not found!" })
    if (userid != comment.userid) return res.json({ success: false, message: "You don't have permission to edit this comment!'" })
    next();
}
module.exports = permissionEditComment