const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const url = 'mongodb://localhost:27017'
const database = 'task-app'

MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log('Unable to connect')
    }

    console.log("Connected successfully to server");

    const db = client.db(database);

    db.collection('tasks').insertMany([
        {
            description: 'task one',
            completed: true
        },
        {
            description: 'task two',
            completed: false
        },
        {
            description: 'task three',
            completed: true
        }
    ], (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log(result.ops);
    })
});
