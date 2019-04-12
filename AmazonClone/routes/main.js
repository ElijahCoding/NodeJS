const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.render('main/home')
})

router.get('/about', (req, res) => {
  res.render('main/about')
})

module.exports = router
