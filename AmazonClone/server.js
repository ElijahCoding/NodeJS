const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const ejsMate = require('ejs-mate')

const User  = require('./models/user')

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
    express.static(__dirname + '/public')
)
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
    res.render('main/about')
})

app.post('/create-user', (req, res, next) => {
    const user = new User()

    user.profile.name = req.body.name
    user.password = req.body.password
    user.email = req.body.email

    user.save(function (err) {
        if (err) next(err)

        res.json('Successfully created a new user')
    })
})

app.listen(3000, (err) => {
    if (err) throw err
    console.log('Service is running');
})
