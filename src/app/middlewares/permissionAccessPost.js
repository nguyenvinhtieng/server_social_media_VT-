const Post = require('../models/Post')

async function permissionAccessPost(req, res, next) {
    let userId = req._id
    let { _id } = req.body
    try {
        let post = await Post.findOne({ _id })
        if (!post) return res.json({ success: false, message: 'Post not found' })
        if (post.userid != userId) return res.json({ success: false, message: 'You do not have permission to access this post' })
        next()
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

module.exports = permissionAccessPost