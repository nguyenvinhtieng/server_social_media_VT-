const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    postid: { type: Schema.Types.ObjectId },
    userid: { type: Schema.Types.ObjectId },
    content: { type: String, required: true },
    reply: { String, default: "" }
},
    {
        timestamp: true
    }
)


module.exports = mongoose.model('Comment', Comment)
