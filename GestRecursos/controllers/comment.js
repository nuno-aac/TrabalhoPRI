var mongoose = require('mongoose')
var Comment = require('../models/comment')

// Returns list of users
module.exports.list = () => {
    return Comment.find().exec()
}

// Returns a user by id
module.exports.lookUp = id => {
    return Comment.findOne({ _id: id }).exec()
}

// Inserts a new user
module.exports.insert = c => {
    var newComment = new Comment(c)
    return newComment.save()
}

// Removes a user by id
module.exports.remove = id => {
    return Comment.deleteOne({ _id: id })
}

// Changes a user
module.exports.edit = (id, u) => {
    return Comment.findByIdAndUpdate(id, u, { new: true })//{id:id}
}

module.exports.getUpvotes = id => {
    return Comment.findOne({_id : id})
        .select({upvotes:1, _id:0})
}

module.exports.addUpvote = (id,idUser) => {
    return Comment.update(
        {_id:id},
        {
            $push: {upvotes: idUser}
        }
    )
}

module.exports.removeUpvote = (id,idUser) => {
    return Comment.update(
        {_id:id},
        {
            $pull: {upvotes: idUser}
        }
    )
}