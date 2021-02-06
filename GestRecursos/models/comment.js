var mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
    user: {type:String, required:true},
    upvotes: [String],
    comment: { type:String, required:true},
    dataComment: { type: Date, required: true},
    postID: { type: mongoose.Schema.Types.ObjectId, require:true},
})

module.exports = mongoose.model('comment', commentSchema)