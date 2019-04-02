const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const auth = require('./routes/auth')

require('./config/passport')(passport)

const app = express()

app.use('/auth', auth)

app.get('/', (req, res) => {
    res.send('works')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})