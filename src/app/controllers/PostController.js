const User = require('../models/User')
const Post = require('../models/Post');
const multiparty = require('multiparty')
const validator = require('validator');
const { POST_SKIP } = require('../../credentials');
const uploadImages = require('../../utils/uploadImages');
class PostController {
    async createPost(req, res) {
        const user = req.user
        try {
            const form = new multiparty.Form();
            form.parse(req, async (err, fields, files) => {
                if (err) console.log(err)
                let images = []
                if (files.images[0].size > 0) {
                    images = await uploadImages(files.images)
                }
                const content = fields.content[0]
                let youtubeLink = ''
                if (fields?.youtubeLink) {
                    youtubeLink = fields.youtubeLink[0].replace("watch?v=", "embed/")
                }
                let data = {
                    id_user: user._id,
                    name_user: user.name,
                    slug_user: user.slug,
                    img_user: user.image,
                    content,
                    images,
                    youtubeLink
                }
                let post = new Post(data)
                await post.save()
                return res.json({ success: true, message: "Post was saved!", post })
            });
        } catch (error) {
            return res.json({ success: false, message: "failure!" })
        }
    }

    async editPost(req, res) {
        const { content, _id } = req.body
        if (validator.isEmpty(content)) return res.json({ success: false, message: "Content is empty!" })
        try {
            const post = await Post.findOneAndUpdate({ _id }, req.body, { new: true })
            return res.json({ success: true, message: "Post updated!", post })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: error.message })
        }
    }

    async deletePost(req, res) {
        try {
            const { id } = req.params
            let post = await Post.findById(id)
            if (post.id_user != req.user._id)
                return res.json({ success: false, message: "You do not have permission to delete this post!" })
            await Post.findOneAndDelete({ _id: id })
            return res.json({ success: true, message: "Post deleted!" })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: error.message })
        }
    }

    async viewPost(req, res) {
        let _id = req.params.id
        try {
            const post = await Post.findById(_id)
            if (!post) return res.json({ success: false, message: "Post not found!" })
            return res.json({ success: true, message: "Get post successfully!", post })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: error.message })
        }
    }

    async getTenPost(req, res) {
        let page = req.query.page
        let slug = req.query.user
        let skip = page * POST_SKIP
        const condition = {}
        if (slug) condition.slug_user = slug
        try {
            let user = null
            if (slug)
                user = await User.findOne({ slug }).select('-password')
            let numberPost = await Post.count(condition)
            if (numberPost <= skip) return res.json({ success: false, message: "You was read all posts!" })
            let posts = await Post
                .find(condition)
                .skip(skip)
                .sort({ createdAt: -1 })
                .limit(POST_SKIP)
                .lean()
            return res.json({ success: true, message: `Get post successfully, page ${page}`, posts, user })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: error.message })
        }
    }
}

module.exports = new PostController();
