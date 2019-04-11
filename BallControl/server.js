const app = require('express')()
const server = require('http').Server()
const jade = require('jade')

const port = 3000

server.listen(port, () => {
    console.log('Server working')
})
