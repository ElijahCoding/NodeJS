const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user');

router.route('/signup')
      .get((req, res, next) => {
          res.render('accounts/signup', { message: req.flash('errors') });
      })
      .post((req, res, next) => {

      })

module.exports = router
