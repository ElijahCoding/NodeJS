const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const feedRoutes = require('./routes/feed')

const app = express()

app.use(bodyParser.json())


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/feed', feedRoutes)

mongoose
  .connect(
    'mongodb://root:hellojava1@ds137596.mlab.com:37596/ecommerce',
    { useNewUrlParser: true }
  )
  .then(result => {
    app.listen(3000)
  })
  .catch(err => console.log(err))
