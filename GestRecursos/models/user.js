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
    access: { type: String, required: true},
    dataRegisto: { type: Date, required:true},
    dataUltimoAcesso: Date
})

module.exports = mongoose.model('user', userSchema)