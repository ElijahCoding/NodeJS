const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const ejsMate = require('ejs-mate')

const mainRoutes = require('./routes/main')
const userRoutes = require('./routes/user')

const app = express()

mongoose.connect('mongodb://root:hellojava1@ds137596.mlab.com:37596/ecommerce', {
    useNewUrlParser: true,
    useCreateIndex: true
}, (err) => {
    if (err) console.log(err)
    console.log('DB Connected');
})

app.use(
    morgan('dev'), bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    express.static(__dirname + '/public'),
    mainRoutes, userRoutes
)
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')


app.listen(3000, (err) => {
    if (err) throw err
    console.log('Service is running');
})
