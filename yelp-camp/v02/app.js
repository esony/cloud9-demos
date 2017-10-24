// =============================================================================
// YELPCAMP EXERCISE
// =============================================================================

// INITIAL
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Camp = mongoose.model("Camp", campSchema);

// Camp.create({
    
//     name: "Gröna Udden", 
//     image : "https://static.pexels.com/photos/176381/pexels-photo-176381.jpeg"
    
//     }, function(err, camp){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("New camp added!");
//             console.log(camp);
//         }
// });

// { "_id" : ObjectId("59cdefd09842dfa386bb5fb3"), "name" : "Gröna Udden", "image" : "https://static.pexels.com/photos/176381/pexels-photo-176381.jpeg", description }
// { "_id" : ObjectId("59cdefe89842dfa386bb5fb4"), "name" : "Härmälä", "image" : "https://static.pexels.com/photos/213807/pexels-photo-213807.jpeg" }
// { "_id" : ObjectId("59cdeffd9842dfa386bb5fb5"), "name" : "Top Camping Vaasa", "image" : "https://static.pexels.com/photos/388303/pexels-photo-388303.jpeg" }
// { "_id" : ObjectId("59cdf00f9842dfa386bb5fb6"), "name" : "Gröna Udden", "image" : "https://static.pexels.com/photos/176381/pexels-photo-176381.jpeg" }
// { "_id" : ObjectId("59cdf0199842dfa386bb5fb7"), "name" : "Top Camping Vaasa", "image" : "https://static.pexels.com/photos/388303/pexels-photo-388303.jpeg" }
// { "_id" : ObjectId("59cdf01d9842dfa386bb5fb8"), "name" : "Härmälä", "image" : "https://static.pexels.com/photos/213807/pexels-photo-213807.jpeg" }
// { "_id" : ObjectId("59cdf1df0a3ea50e8bb6fd66"), "name" : "Hervanta", "image" : "https://static.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg", "__v" : 0 }
// { "_id" : ObjectId("59cdf2964e0db30e9bca61c2"), "name" : "Space", "image" : "https://res.cloudinary.com/teepublic/image/private/s--PEKPlvV0--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1498672686/production/designs/1699412_1.jpg", "__v" : 0 }

// LANDING PAGE
app.get("/", function(req, res){
    res.render("landing.ejs");
});


// =============================================================================
// CAMPING PAGE
// =============================================================================

// INDEX
app.get("/camp", function(req, res){
    // Get camps from db
    Camp.find({}, function(err, allCamps){
        if (err){
            console.log(err);
        } else {
            res.render("index", {camps:allCamps});
        }
    });
});

// CREATE
app.post("/camp", function(req, res){
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
            res.redirect("/camp");
        }
    });
});

// NEW
app.get("/camp/new",function(req, res) {
    res.render("new.ejs");
});

// SHOW
app.get("/camp/:id", function(req, res) {
    Camp.findById(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err);
            res.status(404).send("Sorry, campground not found!");
        } else {
            res.render("show", {camp: foundCamp});
        }
    })
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