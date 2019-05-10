const Post = require('../models/post.model')

module.exports.create = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        imageUrl: `/${req.file.filename}`
    })

    try {
        await post.save()
        res.status(201).json(post)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.getAll = async (req, res) => {
    
}

module.exports.getById = async (req, res) => {

}

module.exports.update = async (req, res) => {

}

module.exports.remove = async (req, res) => {

}

module.exports.addView = async (req, res) => {

}
