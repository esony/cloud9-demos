var express = require("express");
var app = express();

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/scripts"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server listening");
})