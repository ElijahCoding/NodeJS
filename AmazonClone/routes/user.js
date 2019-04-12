const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/signup', (req, res, next) => {
    res.render('accounts/signup')
})

router.post('/signup', (req, res, next) => {
    let user = new User()

    user.profile.name = req.body.name
    user.password = req.body.password
    user.email = req.body.email

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (existingUser) {
            console.log(req.body.email + ' is already exist')
            return res.redirect('/signup')
        } else {
            user.save((err, user) => {
                if (err) return next(err)

                res.json('New user has been created')
            })
        }
    })
})


module.exports = router
