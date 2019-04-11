const app = require('express')()
const jade = require('jade')

const port = 3001

app.set('views', __dirname + '/templates')
app.set('view engine', 'jade')

app.get('/', (req, res, next) => {
    var id = require('./helpers/randomstring')(3)
    res.render('game', {
        id,
        title: 'Game',
        host: req.headers.host
    })

})

app.listen(port, () => {
    console.log('Server working')
})
