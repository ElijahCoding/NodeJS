const mongodb = require('mongodb')

const { MongoClient, ObjectID } = require('mongodb')

const url = 'mongodb://localhost:27017'
const database = 'task-app'

const id = new ObjectID()

MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log('Unable to connect')
    }

    console.log("Connected successfully to server");

    const db = client.db(database);
});
