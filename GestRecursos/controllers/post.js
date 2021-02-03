var mongoose = require('mongoose')
var Post = require('../models/post')

// Returns list of posts
module.exports.list = () => {
    return Post.find({visibilidade: 'PUBLIC'}).exec()
}

//Fazer isto porque not sure if right ----------------------

// Returns a post by id
module.exports.lookUp = id => {
    return Post.findOne({ _id: id }).exec()
}

//Returns posts by recurso
module.exports.lookUp = rID => {
    return Post.find({recursoID: rID, visibilidade: 'PUBLIC' }).exec()
}

// Inserts a new post
module.exports.insert = p => {
    var newPost = new Post(p)
    return newPost.save()
}

module.exports.insertComment = (id,c) => {
    return Post.update(
        {_id:id},
        {
            $push: {comments: c}
        }
    )
}

//Fazer isto porque not sure if right ----------------------

// Removes a post by id
module.exports.remove = id => {
    return Post.deleteOne({ _id: id })
}

//Fazer isto porque not sure if right ----------------------

// Changes a post
module.exports.edit = (id, p) => {
    return Post.findByIdAndUpdate(id, p, { new: true })
}