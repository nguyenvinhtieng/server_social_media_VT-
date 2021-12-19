const User = require('../models/User')

async function userWasCreate(req, res, next) {
    let id = req._id
    try {
        let user = await User.findOne({ userid: id })
        if (user) return res.json({ success: false, message: "User was created" })
        next()
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}
module.exports = userWasCreate