const express = require('express')
var exphbs  = require('express-handlebars')
const mongoose = require('mongoose')

const app = express()

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/video-app', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

const port = 5000

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Server runs on port ${port}`)
})
