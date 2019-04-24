const GenerationEngine = require('./generation/engine')
const express = require('express')

const app = express()
const engine = new GenerationEngine()

engine.start()

app.get('/dragon/new', (req, res, next) => {
    res.json({ dragon: engine.generation.newDragon() })
})

module.exports = app
