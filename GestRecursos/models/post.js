var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
    titulo: { type: String, required: true},
    autor: { type:String, require: true},
    conteudo: { type:String, require:true},
    visibilidade: { type: String, required:true},
    upvotes: [String],
    dataRegisto: { type: Date, required: true},
    recursoID: { type: mongoose.Schema.Types.ObjectId, require:true},
    tipo: { type: String, required:true },
    recTitle: { type:String, required:true }
})

module.exports = mongoose.model('post', postSchema)