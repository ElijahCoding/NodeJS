const app = require('express')()
const jade = require('jade')
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)
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

app.get('/:id', (req, res, next) => {
    res.render('controller', {
        id: req.params.id,
        title: 'Controller',
        host: req.headers.host
    })
})

server.listen(port, () => {
    console.log('Server working')
})
