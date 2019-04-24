const GenerationEngine = require('./generation/engine')
const express = require('express')

const dragonRouter = require('./api/dragon')

const app = express()
const engine = new GenerationEngine()

engine.start()

app.use('/dragon', dragonRouter)

module.exports = app
