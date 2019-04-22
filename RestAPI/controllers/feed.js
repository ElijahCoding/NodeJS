const { validationResult } = require('express-validator/check')

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                title: 'First Post',
                content: 'This is the first post!',
                imageUrl: 'images/duck.jpg',
            }
        ]
    })
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    // Create post in db
    res.status(201).json({
      message: 'Post created successfully!',
      post: { id: new Date().toISOString(), title: title, content: content }
    });
};
