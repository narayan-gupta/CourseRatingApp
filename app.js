var express = require('express'); 
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Course = require('./models/course.js');
var Comment = require('./models/comment.js');
var seedDB = require("./seeds.js");


seedDB();
mongoose.connect('mongodb://localhost/course-app');
app.use(bodyParser.urlencoded({extended: true}));
    

    


    
//Root Route     
app.get('/',function(req,res){
    res.render('home.ejs');
});

//Route to view courses 
app.get('/courses',function(req,res){
    Course.find({},function(err,courses){
        if(err){
            console.log("Error Occured"); 
        } else { 
            res.render('courses/index.ejs', {classes: courses});
        }
    });
});

//Post route to create a new course
app.post('/courses',function(req,res){
    var nameC = req.body.name ;
    var image = req.body.image;
    var topic = req.body.topic;
    Course.create({ name: nameC, img: image, topic: topic}, function(err,course){
        if(err){
            console.log('Course could not be created');
        } else{
            res.redirect("/courses"); 
        }
    });
    
});

//Form to input a new course 
app.get("/courses/new",function(req,res){
    res.render("courses/new.ejs");
});


//Show Page for one course
app.get("/courses/:id", function(req,res){
    var id = req.params.id
    Course.findById(id).populate("comments").exec(function(err,foundCourse){
        if(err){
            console.log("Course Not Found");
        } else{
            console.log(foundCourse);
            res.render("courses/show.ejs",{course: foundCourse});
        }
    });
})

// *********************************************************************8

//***********************************************************************8

app.get("/courses/:id/comments/new",function(req,res){
    Course.findById(req.params.id, function(err,course){
        if(err){
            console.log(err);
        }else{
             res.render("comments/new.ejs", {course: course});
        }
    })
   
})


app.post("/courses/:id/comments",function(req,res){
    Course.findById(req.params.id,function(err,course){
        if(err){
            console.log("Shit Dont Work");
            res.redirect('/courses')
        } else {
            var text = req.body.text;
            var author = req.body.author;
            Comment.create({text: text, author: author}, function(err, comment){
                if(err){
                    console.log(err); 
                } else{
                    course.comments.push(comment);
                    course.save();
                    res.redirect('/courses/' + course._id)
                }
            });
            
        }
    });
});

//Catch all route
app.get('*', function(req,res){
    res.send('<h1>404 Page Not Found</h1>');
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});