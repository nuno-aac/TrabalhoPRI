var mongoose = require('mongoose')

var recursoSchema = new mongoose.Schema({
    //model for recurso, contém meta-data
})

module.exports = mongoose.model('recurso', recursoSchema)