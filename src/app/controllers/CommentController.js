const Post = require('../models/Post');
const mongoose = require('mongoose');

class CommentController {
    async addComment(req, res) {
        const { post_id, content } = req.body
        const user = req.user
        try {
            const commentId = new mongoose.Types.ObjectId()
            const comment = {
                _id: commentId,
                content,
                id_user: user._id,
                name_user: user.name,
                slug_user: user.slug,
                img_user: user.image,
            };
            const post = await Post.findById(post_id);
            post.comments.push(comment)
            await post.save()
            return res.json({ success: true, message: "Add comment to post successfully!", comment })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: error.message })
        }
    }

    async deleteComment(req, res) {
        try {
            let { post_id, comment_id, content } = req.body
            const post = await Post.findById(post_id);
            const comment = post.comments.id(comment_id);
            if (comment.id_user != req.user._id)
                return res.json({ success: false, message: "You don't have permission to delete this comment" })
            comment.remove();
            await post.save()
            return res.json({ success: true, message: "Comment deleted!" })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: "Delete comment failure!" })
        }

    }

    async editComment(req, res) {
        try {
            let { post_id, comment_id, content } = req.body
            const post = await Post.findById(post_id);
            const comment = post.comments.id(comment_id);
            comment.content = content
            if (comment.id_user != req.user._id)
                return res.json({ success: false, message: "You don't have permission to edit this comment" });
            await post.save();
            return res.json({ success: true, message: "Comment updated", comment });
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: "Comment update failure" });
        }

    }
}

module.exports = new CommentController();
