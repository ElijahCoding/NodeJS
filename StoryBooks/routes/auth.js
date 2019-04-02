const express = require('express')
const router = express.Router()

router.get('/google', (req, res) => {
    res.send('google auth')
})

module.exports = router
