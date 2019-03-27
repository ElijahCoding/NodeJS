const express = require('express')
const bodyParser = require('body-parser')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(
    express.json(), bodyParser.json(),
    userRouter, taskRouter, bodyParser.urlencoded({ extended: false })
)

module.exports = app
