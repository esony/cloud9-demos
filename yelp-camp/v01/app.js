// =================================
// YELPCAMP EXERCISE
// =================================

// INITIAL
var express = require("express");
var app = express();
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

    var camps = [
        {name: "Gröna Udden", image : "https://static.pexels.com/photos/176381/pexels-photo-176381.jpeg"},
        {name: "Härmälä", image: "https://static.pexels.com/photos/213807/pexels-photo-213807.jpeg"},
        {name: "Top Camping Vaasa", image: "https://static.pexels.com/photos/388303/pexels-photo-388303.jpeg"},
        {name: "Gröna Udden", image : "https://static.pexels.com/photos/176381/pexels-photo-176381.jpeg"},
        {name: "Härmälä", image: "https://static.pexels.com/photos/213807/pexels-photo-213807.jpeg"},
        {name: "Top Camping Vaasa", image: "https://static.pexels.com/photos/388303/pexels-photo-388303.jpeg"}
        ];

// LANDING PAGE
app.get("/", function(req, res){
    res.render("landing.ejs");
});

// CAMPING PAGE
app.get("/camp", function(req, res){
    res.render("camp", {camps:camps});
});

// ADD NEW CAMP
app.post("/camp", function(req, res){
    // Get Data
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {name: name, image: image};
    camps.push(newCamp);
    // Redirect
    res.redirect("/camp");
});

app.get("/camp/new",function(req, res) {
    res.render("new.ejs");
});

// SERVER LISTENER
app.listen(process.env.PORT, process.env.IP, function() {
        console.log("YelpCamp server started");
});