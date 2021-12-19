const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = new Schema({
    id_user: { type: String, required: true },
    name_user: { type: String, required: true },
    slug_user: { type: String, required: true },
    img_user: { type: String, required: true },
    content: { type: String, required: true },
}, {
    timestamps: true
});
const Post = new Schema({
    id_user: { type: String, required: true },
    name_user: { type: String, required: true },
    slug_user: { type: String, required: true },
    img_user: { type: String, required: true },
    content: { type: String },
    images: { type: Array },
    youtubeLink: { type: String },
    comments: [Comment]
}, {
    timestamps: true
}
);
module.exports = mongoose.model('Post', Post);
