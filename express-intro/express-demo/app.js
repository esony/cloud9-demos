console.log("THIS IS EXPRESS DEMO");

// ================================
// IMPORTS
// ================================
var express = require("express");
var app = express();

//  "/" => Hello
app.get("/", function(req, res){
    res.send("Hi there!");
});

// "/bye" => Goodbye
app.get("/bye", function(req, res){
    console.log("Goodbyes requested")
    res.send("Goodbye");
});

// "/dog" => MEOW

// Set express to listen for requests
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});
