const express = require('express')
const router = new express.Router()
const mongoose = require('mongoose')
const { ensureAuthenticated } = require('../helpers/auth')

require('../models/Idea')
const Idea = mongoose.model('ideas')

router.get('/', ensureAuthenticated, (req, res) => {
    Idea.find({ user: req.user.id })
        .sort({ date: 'desc' })
        .then(ideas => {
            res.render('ideas/index', {
                ideas
            })
        })
})

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('ideas/add')
})

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        if (idea.user =! req.user.id) {
            req.flash('error_msg', 'Not Authorized')
            res.redirect('/ideas')
        } else {
            res.render('ideas/edit' ,{
                idea
            })
        }
    })
})

router.post('/', (req, res) => {
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
            details: req.body.details,
            user: req.user.id
        }

        new Idea(newUser).save()
                         .then(idea => {
                             res.redirect('/ideas')
                         })
    }
})

router.put('/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        idea.title = req.body.title
        idea.details = req.body.details
        idea.save().then(idea => {
            res.redirect('/ideas')
        })
    })
})

router.delete('/:id', (req, res) => {
    Idea.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Video idea removed');
            res.redirect('/ideas')
        })
})

module.exports = router
