const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String },
    email: { type: String, default: '' },
    introduction: { type: String, default: '' },
    image: { type: String, default: '' },
    website: { type: String, default: '' },
    common: { type: String, default: "no" },
    slug: { type: String, slug: "name" },
    role: { type: String, default: 'user' }
},
    {
        timestamps: true
    }
);

mongoose.plugin(slug);
module.exports = mongoose.model('User', User);
