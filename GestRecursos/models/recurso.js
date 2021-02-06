var mongoose = require('mongoose')

var recursoSchema = new mongoose.Schema({
    tipo: { type:String, required:true },
    titulo: { type: String, required: true},
    dateCreation: { type: Number, required: true},
    dataRegisto: { type: Date, required: true},
    visibilidade: { type: String, required: true},
    autor: { type: String, required: true},
    ratings: [
        {
            rating: Number,
            user: String
        }
    ]
})

module.exports = mongoose.model('recurso', recursoSchema)