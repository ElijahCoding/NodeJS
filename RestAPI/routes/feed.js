const express = require('express')
const router = express.Router()
const { body } = require('express-validator/check')

const feedController = require('../controllers/feed')

const isAuth = require('../middleware/is-auth')

router.get('/posts', isAuth, feedController.getPosts)

router.post('/post', [
    body('title').trim().isLength({ min: 7 }),
    body('content').trim().isLength({ min: 5 })
], feedController.createPost)

router.get('/posts/:postId', isAuth, feedController.getPost)

router.put('/posts/:postId', isAuth, feedController.updatePost)

router.delete('/posts/:postId', isAuth, feedController.deletePost)

module.exports = router
