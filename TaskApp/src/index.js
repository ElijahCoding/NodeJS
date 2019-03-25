const express = require('express')
const bodyParser = require('body-parser')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use((req, res, next) => {
    if (req.method === 'GET') {
        res.send('GET request')
    } else {
        next()
    }
})

app.use(
    express.json(), bodyParser.json(),
    userRouter, taskRouter, bodyParser.urlencoded({ extended: false })
)


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
