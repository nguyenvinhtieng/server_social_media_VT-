const AuthRoute = require('./auth')
const PostRoute = require('./post')
const UserRoute = require('./user')
const CommentRoute = require('./comment')
function route(app) {
    app.use('/api', AuthRoute)
    app.use('/api/posts/', PostRoute)
    app.use('/api/users/', UserRoute)
    app.use('/api/comments/', CommentRoute)
}
module.exports = route