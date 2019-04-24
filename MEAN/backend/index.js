const GenerationEngine = require('./engine')
const express = require('express')

const app = express()
const engine = new GenerationEngine()

engine.start()

app.get('/dragon/new', (req, res, next) => {
    res.json({ dragon: engine.generation.newDragon() })
})

app.listen(3000, () => {
    console.log('Working')
})

module.exports = app
