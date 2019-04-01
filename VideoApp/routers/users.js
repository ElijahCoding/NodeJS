const express = require('express')
const router = new express.Router()

router.get('/login', (req, res) => {
    res.send('login')
})

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', (req, res) => {
    let errors = []

    if (req.body.password != req.body.password2) {
        errors.push({ text: 'Passwords do not match' })
    }

    if (req.body.password.length <= 4) {
        errors.push({ text:'Password must be at least 4 characters' });
    }
})

module.exports = router
