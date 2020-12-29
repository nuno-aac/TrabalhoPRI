var mongoose = require('mongoose')

var recursoSchema = new mongoose.Schema({
    tipo: String, //required?
    titulo: { type: String, required: true},
    subtitulo: String,
    dateCreation: Date, //this one is weird, como e que vamos buscar esta informaçao?
    dataRegisto: { type: Date, required: true},
    visibilidade: { type: String, required: true},
    autor: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('recurso', recursoSchema)