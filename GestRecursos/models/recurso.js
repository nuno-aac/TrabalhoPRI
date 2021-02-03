var mongoose = require('mongoose')

var recursoSchema = new mongoose.Schema({
    tipo: String, //required?
    titulo: { type: String, required: true},
    subtitulo: String,
    dateCreation: { type: Number, required: true},
    dataRegisto: { type: Date, required: true},
    visibilidade: { type: String, required: true},
    autor: { type: String, required: true},
    size: Number,
    rating: Number, //classificaçao (se votar 4 estrelas e outra pessoa votar 3 fica 7 aqui, depois divide-se pelo num de ratings que seria 2)
    numRatings: Number
})

module.exports = mongoose.model('recurso', recursoSchema)