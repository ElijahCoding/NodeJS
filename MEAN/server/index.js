const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
    res.send({ text: 'working' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT)
