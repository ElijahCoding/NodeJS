const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
    try {

    } catch (e) {
        res.status(401).send(e)
    }
}

module.exports = auth
