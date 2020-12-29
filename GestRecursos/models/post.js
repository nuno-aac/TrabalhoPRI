var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
    //model for post, título, lista de comentários, etc?
    titulo: { type: String, required: true},
    conteudo: String,
    comments: [{ type: String }],
    upvotes: { type: Number, default: 0 },
    recursoID: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('post', postSchema)