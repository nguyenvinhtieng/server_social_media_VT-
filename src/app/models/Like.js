const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Like = new Schema({
    postid: { type: Schema.Types.ObjectId, ref: 'Post' },
    like: { type: Number },
})


module.exports = mongoose.model('Like', Like)
