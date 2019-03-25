const express = require('express')
const bodyParser = require('body-parser')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
