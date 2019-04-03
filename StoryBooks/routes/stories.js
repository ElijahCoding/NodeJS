const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Story = mongoose.model('stories')
const User = mongoose.model('users')
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth')

router.get('/', (req, res) => {
    Story.find({ status: 'public' }).populate('user').then(stories => {
        res.render('stories/index', {
            stories
        })
    })
})

router.get('/show/:id', (req, res) => {
    Story.findOne({ _id: req.params.id })
         .populate('user')
         .then(story => {
             if (!story) {
                 res.send('not found')
             } else {
                 res.render('stories/show', {
                     story
                 })
             }
         })
})

router.get('/add', (req, res) => {
  res.render('stories/add')
})

router.post('/', (req, res) => {
    let allowComments

    if (req.body.allowComments) {
        allowComments = true
    } else {
        allowComments = false
    }

    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments,
        user: req.user.id
    }

    new Story(newStory).save().then(story => {
        res.redirect(`/stories/show/${story.id}`)
    })
})

module.exports = router
