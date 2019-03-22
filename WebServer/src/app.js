const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Elijah'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    res.send({
        forecast: '',
        location: '',
        address: req.query.address
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Elijah'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help Text',
        title: 'Help',
        name: 'Elijah'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Elijah',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => console.log('Server is up'))
