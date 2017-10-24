var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome!");
});

app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof",
        cat: "miumiumiu",
        goldfish: "splash"
    }
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    
    res.send("The " + animal + " says " + sound);
});

app.get("/repeat/:message/:times", function(req, res) {
   var message = req.params.message;
   var times = req.params.times;
   var result = "";
   
  for (var i = 0; i < times; i++){
      result += i + ". " + message + "<p>";
  }
   res.send(result);
   
});

app.get("*", function(req, res) {
   res.send("Sorry, page not found. Get a life."); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App connection");
});