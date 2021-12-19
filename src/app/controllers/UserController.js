const multiparty = require('multiparty')
const User = require('../models/User')
const uploadImages = require('../../utils/uploadImages');

class UserController {

    async updateUser(req, res) {
        try {
            const user = req.user
            var form = new multiparty.Form();
            form.parse(req, async function (err, fields, files) {
                const name = fields.name[0]
                const email = fields.email[0]
                const introduction = fields.introduction[0]
                let image = user.images
                if (files?.image[0].size > 0) {
                    let images = await uploadImages(files.image)
                    image = images[0]
                }
                let newData = { name, email, introduction, image }
                let newUser = await User
                    .findOneAndUpdate({ _id: user._id }, newData, { new: true })
                    .select("-password")
                return res.json({ success: true, message: "User updated!", user: newUser })
            })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: "User updated failure!" })
        }
    }

    async viewUser(req, res) {
        let slug = req.params.slug
        try {
            let user = await User.findOne({ slug }).select('-password')
            if (!user) return res.json({ success: false, message: "User not found" })
            return res.json({ success: true, message: "Get user data successfully", user })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: error.message })
        }
    }

    async getUser(req, res) {
        let slug = req.params.slug
        try {
            let user = await User.findOne({ slug }).select('-password')
            if (!user) return res.json({ success: false, message: "User not found" })
            return res.json({ success: true, message: "Get user data successfully", user })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: error.message })
        }
    }
}

module.exports = new UserController();