
var mongoose = require("mongoose");
var courseSchema = new mongoose.Schema({
    name: String, 
    img: String,
    topic: String,
    comments: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
}); 


module.exports = mongoose.model("Course", courseSchema);