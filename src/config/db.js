const mongoose = require('mongoose');
const { CONNECTION_STRING } = require('../credentials')
async function connect() {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully')
    }
    catch (e) {
        console.log(e)
        console.log('Connect failure')
    }
}

module.exports = { connect };
