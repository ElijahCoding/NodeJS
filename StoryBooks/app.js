const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const exphbs = require('express-handlebars')
const keys = require('./config/keys')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const index = require('./routes/index')
const auth = require('./routes/auth')
const stories = require('./routes/stories')

require('./models/User')

require('./config/passport')(passport)

mongoose.Promise = global.Promise

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))

app.use(cookieParser())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})

app.use(express.static(path.join(__dirname + 'public')))

app.use('/', index)
app.use('/auth', auth)
app.use('/stories', stories)


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
