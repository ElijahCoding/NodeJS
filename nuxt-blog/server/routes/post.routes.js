const passport = require('passport')
const { Router } = require('express')
const postController = require('../controllers/post.controller')
const router = Router()

router.post(
    '/admin/',
    passport.authenticate('jwt', { session: false }),
    postController.create
)

router.get(
    '/admin/',
    passport.authenticate('jwt', {session: false}),
    postController.getAll
)

router.get(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  postController.getById
)

module.exports = router
