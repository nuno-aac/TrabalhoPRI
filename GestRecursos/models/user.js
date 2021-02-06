var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    nome: { type: String, required: true},
    email: { type: String, required: true},
    filiacao: String,
    age: { type: Number, required: true},
    bio: String,
    access: { type: String, required: true},
    dataRegisto: { type: Date, required:true},
    dataUltimoAcesso: Date
})

module.exports = mongoose.model('user', userSchema)