const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/task-app-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        validate (value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
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
