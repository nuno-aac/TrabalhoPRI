var mongoose = require('mongoose')
var Comment = require('../models/comment')

// Returns list of comments by post
module.exports.list = (id) => {
    return Comment.find({postID: id}).exec()
}

// Returns a comment by id
module.exports.lookUp = id => {
    return Comment.findOne({ _id: id }).exec()
}

// Inserts a new comment
module.exports.insert = c => {
    var newComment = new Comment(c)
    return newComment.save()
}

// Removes a comment by id
module.exports.remove = id => {
    return Comment.deleteOne({ _id: id })
}

// Changes a comment <- not done
module.exports.edit = (id, c) => {
    return Comment.findByIdAndUpdate(id, c, { new: true })
}

// Adds upvote to comment
module.exports.addUpvote = (id,idUser) => {
    return Comment.update(
        {_id:id},
        {
            $push: {upvotes: idUser}
        }
    )
}

// Removes upvote from comment
module.exports.removeUpvote = (id,idUser) => {
    return Comment.update(
        {_id:id},
        {
            $pull: {upvotes: idUser}
        }
    )
}