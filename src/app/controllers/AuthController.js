const User = require('../models/User');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multiparty = require('multiparty');
const { SECRET_KEY } = require('../../credentials')
class AuthController {
    async LoginHandler(req, res) {
        const { username, password } = req.body
        if (validator.isEmpty(username ? username : "", [{ ignore_whitespace: false }])
            || validator.isEmpty(password ? password : "", [{ ignore_whitespace: false }]))
            return res.json({ success: false, message: 'Empty username or password' })
        try {
            let user = await User.findOne({ username })
            if (!user) return res.json({ success: false, message: 'Username incorrect!' })
            let validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) return res.json({ success: false, message: 'Password incorrect!' })
            let token = jwt.sign({ _id: user._id }, SECRET_KEY);
            user.password = null;
            return res.json({
                success: true,
                message: 'Login successfully!',
                token,
                user: user
            }
            )
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: error.message })
        }
    }

    async RegisterHandler(req, res) {
        console.log(req.body)
        const { username, password, fullname } = req.body
        if (username.trim() === '' || password.trim() === '' || fullname.trim() === '')
            return res.json({ success: false, message: 'Missing data!' })
        try {
            const us = await User.findOne({ username })
            if (us) {
                return res.json({ success: false, message: "Username was exitst!" })
            }
            let newPass = await bcrypt.hash(password, 10);
            const data = {
                username,
                password: newPass,
                name: fullname,
                image: "https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
            }
            const user = new User(data)
            await user.save()
            return res.json({ success: true, message: "Register success!", user })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: err.message })
        }
    }

    async Next(req, res) {
        try {
            let id = req.user._id
            let user = await User.findOne({ _id: id }).lean().select('-password')
            return res.json({ success: true, message: "success", user })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: err.message })
        }
    }
}

module.exports = new AuthController();
