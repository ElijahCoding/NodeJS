const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
const passportConf = require('../config/passport')

router.get('/login', (req, res, next) => {
    if (req.user) return res.redirect('/')
    res.render('accounts/login', {
        message: req.flash('loginMessage')
    })
})


router.get('/signup', (req, res, next) => {
    res.render('accounts/signup', {
        errors: req.flash('errors')
    })
})

router.post('/signup', (req, res, next) => {
    let user = new User()

    user.profile.name = req.body.name
    user.password = req.body.password
    user.email = req.body.email

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (existingUser) {
            req.flash('errors', 'Account with that email address already exists')
            return res.redirect('/signup')
        } else {
            user.save((err, user) => {
                if (err) return next(err)

                res.redirect('/')
            })
        }
    })
})


module.exports = router
