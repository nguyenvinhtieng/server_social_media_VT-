const express = require('express');
const app = express();
var bodyParser = require('body-parser')
var cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
const { PORT } = require('./credentials')
const port = process.env.PORT || PORT
const route = require('./route')
const db = require('./config/db')
db.connect()
route(app)
app.listen(port, () => console.log(`App listening at ${port}`))
