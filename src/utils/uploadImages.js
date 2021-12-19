const cloudinary = require('../config/cloudinary')
async function uploadImages(files) {
    let imgPath = []
    for (let index = 0; index < files.length; index++) {
        let result = await cloudinary.uploader.upload(files[index].path);
        imgPath.push(result.url)
    }
    return imgPath
}
module.exports = uploadImages;