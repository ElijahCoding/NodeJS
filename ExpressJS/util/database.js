const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'Cart',
  password: 'root',
  port: '8889'
})

module.exports = connection.promise()
