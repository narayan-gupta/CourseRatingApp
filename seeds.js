var mongoose = require("mongoose");
var Course = require('./models/course.js');
var Comment = require('./models/comment.js');
var Rating = require('./models/rating.js');
var data = [
    {
     name: "Intro To Ruby",
     img: "https://bgasparotto.com/wp-content/uploads/2016/03/ruby-logo.png",
     topic: "Ruby"
    }, 
    
    {
     name: "Intro To HTML",
     img: "http://www.bobbyberberyan.com/wp-content/uploads/2012/03/HTML5CSS3Logos.svg",
     topic: "HTML"
    },
    
    {
     name: "Intro To CSS",
     img: "http://www.bobbyberberyan.com/wp-content/uploads/2012/03/HTML5CSS3Logos.svg",
     topic: "CSS"
    }
];
function seedDB(){
    Course.remove({}, function(err){
        if(err){
        console.log(err);
        }
        console.log("Campground gone");
        data.forEach(function(seed){
        Course.create(seed,function(err,data){
            if(err){
                console.log(err);
            } else{
                console.log("Data Created");
                Comment.create(
                    {
                        text: "Good Course Needs a little work tho",
                        author: "6 DOG"
                    }, function(err,comment){
                        if(err){
                            console.log(err);
                        } else { 
                            data.comments.push(comment);
                            data.save();
                        }
                });
                Rating.create(
                    {
                        score: 5,
                        author: "Me"
                    }, function(err,rating){
                        if(err){
                            console.log(err);
                        } else { 
                            console.log(rating.score);
                            data.ratings.push(rating);
                            data.save();
                        }
                });
            }
        });
    });
    });
}

module.exports = seedDB;