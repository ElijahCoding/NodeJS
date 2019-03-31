const express = require('express')
var exphbs  = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

const port = 5000

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Server runs on port ${port}`)
})
