const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user').User;

const router = express.Router();

router.get('/', (req, res) => res.send('Status: good'));

module.exports = router;
