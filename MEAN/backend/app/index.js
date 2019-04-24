const GenerationEngine = require('./generation/engine')
const express = require('express')

const dragonRouter = require('./api/dragon')
const generationRouter = require('./api/generation')

const app = express()
const engine = new GenerationEngine()

app.locals.engine = engine

engine.start()

app.use('/dragon', dragonRouter)
app.use('/generation', generationRouter)

module.exports = app
