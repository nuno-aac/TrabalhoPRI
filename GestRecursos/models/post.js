var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
    //model for post, título, lista de comentários, etc?
    titulo: { type: String, required: true},
    autor: { type:String, require: true},
    conteudo: { type:String, require:true},
    comments: [{
        user: String,
        upvotes: { type: Number, default: 0},
        comment: String
    }],
    upvotes: { type: Number, default: 0 },
    recursoID: { type: mongoose.Schema.Types.ObjectId, require:true}
})

module.exports = mongoose.model('post', postSchema)