const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
const { PORT } = require('./credentials')
const port = process.env.PORT || PORT
const route = require('./route')
const db = require('./config/db')
const handleSocket = require('./socket/index')
db.connect()
route(app)
handleSocket(io)
server.listen(port, () => console.log(`App listening at ${port}`))
