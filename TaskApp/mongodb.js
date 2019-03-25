const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const url = 'mongodb://localhost:27017'
const database = 'task-app'

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(database);

  

  client.close();
});
