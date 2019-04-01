const express = require('express')
const exphbs  = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/video-app', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

require('./models/Idea')
const Idea = mongoose.model('ideas')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 5000

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/ideas', (req, res) => {
    Idea.find({})
        .sort({ date: 'desc' })
        .then(ideas => {
            res.render('ideas/index', {
                ideas
            })
        })
})

app.get('/ideas/add', (req, res) => {
    res.render('ideas/add')
})

app.get('/ideas/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        res.render('ideas/edit' ,{
            idea
        })
    })
})

app.post('/ideas', (req, res) => {
    let errors = []

    if (!req.body.title) {
        errors.push({ text: 'Please add a title' })
    }

    if (!req.body.details) {
        errors.push({ text: 'Please add a detail' })
    }

    if (errors.length > 0) {
        res.render('ideas/add', {
            errors,
            title: req.body.title,
            details: req.body.details
        })
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details
        }

        new Idea(newUser).save()
                         .then(idea => {
                             res.redirect('/ideas')
                         })
    }
})

app.listen(port, () => {
    console.log(`Server runs on port ${port}`)
})
