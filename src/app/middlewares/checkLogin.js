var mongoose = require('mongoose');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../credentials')

async function isLogin(req, res, next) {
    let header = req.headers.authorization
    let token = header && header.split(' ')[1]
    if (!token) {
        return res.json({ success: false, message: "Token missing" })
    }
    try {
        var decoded = jwt.verify(token, SECRET_KEY)
        const { _id } = decoded
        let user = await User.findOne({ _id })
        if (!user) return res.json({ success: false, message: "User was not found" })
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

module.exports = isLogin