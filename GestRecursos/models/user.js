var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    //model for user, not finished
    id: { type: String, required: true, unique: true}, //username
    password: { type: String, required: true},
    nome: { type: String, required: true},
    email: { type: String, required: true},
    filiaçao: String, //do we need this? metemos options: estudante, docente, departamento, etc?
    age: { type: Number, required: true},
    bio: String,
    access: { type: String, required: true},// METE JWT
    dataRegisto: { type: Date, required:true},
    dataUltimoAcesso: Date,
    recursos: [ {
        tipo: String, //required? pode ter tipos nao esperados
        titulo: { type: String, required: true},
        subtitulo: String,
        dateCreation: Date, //this one is weird, como e que vamos buscar esta informaçao?
        dataRegisto: { type: Date, required: true},
        visibilidade: { type: String, required: true},
        size: { type: Number, required: true},
        rating: Number,
        posts: [{
            titulo: { type: String, required: true},
            conteudo: String,
            upvotes: { type: Number, default: 0 },
            comments: [{
                upvotes: { type: Number, default: 0 },
                comment: String,
                id_user: String
            }]
        }]
    }]
})

module.exports = mongoose.model('user', userSchema)