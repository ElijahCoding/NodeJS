const app = require('express')()
const jade = require('jade')

const port = 3001

app.set('views', __dirname + '/templates')
app.set('view engine', 'jade')

app.get('/', (req, res, next) => {
    res.render('game', {
        id: 'abc',
        title: 'hi',
        host: req.headers.host
    })

})

app.listen(port, () => {
    console.log('Server working')
})
