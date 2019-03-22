const express = require('express')
const path = require('path')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => res.render('index'))
app.get('/about', (req, res) => res.render('about'))

app.listen(3000, () => console.log('Server is up'))
