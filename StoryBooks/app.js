const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const exphbs = require('express-handlebars')
const keys = require('./config/keys')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const index = require('./routes/index')
const auth = require('./routes/auth')

require('./models/User')

require('./config/passport')(passport)

mongoose.Promise = global.Promise

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

const app = express()

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

app.use('/', index)
app.use('/auth', auth)


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
