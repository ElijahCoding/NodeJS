const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const auth = require('./routes/auth')
const keys = require('./config/keys')
const session = require('express-session')
const cookieParser = require('cookie-parser')
require('./models/User')

require('./config/passport')(passport)

mongoose.Promise = global.Promise

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

const app = express()

app.use(cookieParser())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', auth)


app.get('/', (req, res) => {
    res.send('works')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
