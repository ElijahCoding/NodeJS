const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/task-app-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({
    description: 'Task One',
    completed: false
})

task.save().then(response => {
    console.log(response);
}).catch(error => {
    console.log(error);
})
