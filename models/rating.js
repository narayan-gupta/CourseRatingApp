var mongoose = require('mongoose');

var ratingSchema = mongoose.Schema({
    score: Number,
    author: String
});



module.exports = mongoose.model("Rating", ratingSchema);