var mongoose = require('mongoose');

var myBooks = mongoose.Schema({
    name:String,
    author:String
})

module.exports = mongoose.model("myBooks",myBooks)