const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.json('elijah')
})

app.listen(3000, (err) => {
    if (err) throw err
    console.log('Service is running');
})
