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
    ratings: [
        {
            rating: Number,
            user: String
        }
    ]
})

module.exports = mongoose.model('recurso', recursoSchema)