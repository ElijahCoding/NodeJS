const express = require('express')
const path = require('path')
const exphbs  = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const passport = require('passport')
const session = require('express-session')

const app = express()

const ideas = require('./routers/ideas')
const users = require('./routers/users')

require('./config/passport')(passport)
const db = require('./config/database')

mongoose.Promise = global.Promise

mongoose.connect(db.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())
app.use(passport.session())

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/ideas', ideas)
app.use('/users', users)

app.listen(port, () => {
    console.log(`Server runs on port ${port}`)
})
