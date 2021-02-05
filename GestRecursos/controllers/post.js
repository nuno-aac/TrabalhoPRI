var mongoose = require('mongoose')
var Post = require('../models/post')

ObjectID = mongoose.Types.ObjectId

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
module.exports.lookUpRec = rID => {
    return Post.find({recursoID: rID, visibilidade: 'PUBLIC' }).exec()
}

// Inserts a new post
module.exports.insert = p => {
    var newPost = new Post(p)
    return newPost.save()
}

// Removes a post by id
module.exports.remove = id => {
    return Post.deleteOne({ _id: id })
}

// Changes a post
module.exports.edit = (id, p) => {
    return Post.findByIdAndUpdate(id, p, { new: true })
}




module.exports.getComment = (id, idCom) => {
    return Post.findOne({_id: id}).select({ comments: {$elemMatch: {_id: idCom}}})
}

module.exports.insertComment = (id,c) => {
    return Post.update(
        {_id:id},
        {
            $push: {comments: c}
        }
    )
}

module.exports.addUpvoteComment = (id, idCom, idUser) => {
    var idcomment = mongoose.Types.ObjectId(idCom);
    return Post.update(
        { _id: id },
        {
            $push: { "comments.$[b].upvotes": idUser }
        },
        {
            new:true,
            arrayFilters: [
                { "b._id": idcomment }
            ]
        }
    )
}

module.exports.removeUpvoteComment = (id,idUser) => {
    var idcomment = mongoose.Types.ObjectId(idCom);
    return Post.update(
        { _id: id },
        {
            $pull: { "comments.$[b].upvotes": idUser }
        },
        {
            new:true,
            arrayFilters: [
                { "b._id": idcomment }
            ]
        }
    )
}



//get upvotes
module.exports.getUpvotes = id => {
    return Post.findOne({_id : id})
        .select({upvotes:1, _id:0})
}

module.exports.addUpvote = (id,idUser) => {
    return Post.update(
        {_id:id},
        {
            $push: {upvotes: idUser}
        }
    )
}

module.exports.removeUpvote = (id,idUser) => {
    return Post.update(
        {_id:id},
        {
            $pull: {upvotes: idUser}
        }
    )
}