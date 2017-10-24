// =============================================================================
// YELPCAMP EXERCISE
// =============================================================================

// INITIAL
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Camp = require("./models/campground")
var Comment = require("./models/comment")
var seedDB = require("./seeds")

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();


// LANDING PAGE
app.get("/", function(req, res){
    res.render("landing.ejs");
});


// =============================================================================
// CAMPING ROUTES
// =============================================================================

// INDEX
app.get("/camps", function(req, res){
    // Get camps from db
    Camp.find({}, function(err, allCamps){
        if (err){
            console.log(err);
        } else {
            res.render("camps/index", {camps:allCamps});
        }
    });
});

// CREATE
app.post("/camps", function(req, res){
    // Get Data
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCamp = {name: name, image: image, description: desc};
    Camp.create(newCamp, function(err, newlyAdded){
        if(err){
            console.log(err);
        } else {
            console.log("Camp added!");
            console.log(newlyAdded);
            // Redirect
            res.redirect("/camps");
        }
    });
});

// NEW
app.get("/camps/new",function(req, res) {
    res.render("camps/new");
});

// SHOW
app.get("/camps/:id", function(req, res) {
    Camp.findById(req.params.id).populate("comments").exec(
        function(err, foundCamp){
            if(err){
                console.log(err);
                res.status(404).send("Sorry, campground not found!");
            } else {
                res.render("camps/show", {camp: foundCamp});
            }
        }
    );
});

// =============================================================================
// COMMENTS ROUTES
// =============================================================================

// NEW
app.get("/camps/:id/comments/new", function(req, res) {
    Camp.findById(req.params.id, function(err, camp){
        if (err){
            console.log(err);
        } else {
            res.render("comments/new", {camp: camp});
        }
    });
});

// CREATE
app.post("/camps/:id/comments", function(req, res){
    Camp.findById(req.params.id, function(err, camp){
        if (err){
            console.log(err);
            res.redirect("/camps");
        } else {
            console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
               if (err){
                   console.log(err);
               } else {
                   camp.comments.push(comment);
                   camp.save();
                   res.redirect("/camps/" + camp._id);
               }
            });
        }
    });
});

// =============================================================================
// 404
// =============================================================================
app.get("*", function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// =============================================================================
// SERVER LISTENER
// =============================================================================

app.listen(process.env.PORT, process.env.IP, function() {
        console.log("YelpCamp server started");
});