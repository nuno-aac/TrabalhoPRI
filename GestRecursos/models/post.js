var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
    //model for post, título, lista de comentários, etc?
    titulo: { type: String, required: true},
    autor: { type:String, require: true},
    conteudo: { type:String, require:true},
    comments: [{
        user: String,
        upvotes: [String],
        comment: String,
        dataComment: { type: Date, required: true}
    }],
    visibilidade: { type: String, required:true},
    upvotes: [String],
    dataRegisto: { type: Date, required: true},
    recursoID: { type: mongoose.Schema.Types.ObjectId, require:true}
})

module.exports = mongoose.model('post', postSchema)