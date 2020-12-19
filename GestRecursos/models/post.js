var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
    //model for post, título, lista de comentários, etc?
})

module.exports = mongoose.model('post', postSchema)