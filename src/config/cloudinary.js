const cloudinary = require("cloudinary");
const credentials = require('../credentials')
cloudinary.config({
    cloud_name: credentials.CLOUDINARY.CLOUD_NAME,
    api_key: credentials.CLOUDINARY.API_KEY,
    api_secret: credentials.CLOUDINARY.API_SECRET
});
module.exports = cloudinary