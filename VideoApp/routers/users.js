const express = require('express')
const router = new express.Router()

router.get('/login', (req, res) => {
    res.send('login')
})

router.get('/register', (req, res) => {
    res.render('users/register')
})

module.exports = router
