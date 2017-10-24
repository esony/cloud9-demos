var bodyParser      = require("body-parser"),
express             = require("express"),
expressSanitizer    = require("express-sanitizer"),
methodOverride      = require("method-override"),
mongoose            = require("mongoose"),
app                 = express();

// APP CONFIG
// ================
var dbUrl = "mongodb://localhost/blog_app";
mongoose.connect(dbUrl, {useMongoClient: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// Mongoose does not reconnect if failed to connect on startup
// Workaround function if needed:
// var connectWithRetry = function() {
//   return mongoose.connect(dbUrl, function(err) {
//     if (err) {
//       console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
//       setTimeout(connectWithRetry, 5000);
//     }
//   });
// };
// 
// connectWithRetry();


// MODEL CONFIG
// ================

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "New Post!",
//     image: "asdasd",
//     body: "THIS IS MY NEW BLOG POST"
// });

// RESTFUL ROUTES
// ================

app.get("/", function(req, res){
    res.redirect("/blogs");
});


// INDEX
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if (err){
            console.log("err");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//  CREATE
app.post("/blogs", function(req, res){
    // Sanitize the user input and create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if (err){
            res.status(404).send("Sorry, page not found.");
        } else {
            res.render("show", {blog: blog});
        }
    });
});

// EDIT
app.get("/blogs/:id/edit", function (req, res){
    Blog.findById(req.params.id, function(err, blog){
        if (err){
            res.status(404).send("Sorry, page not found.");
        } else {
            res.render("edit", {blog: blog});
        }
    });
});

// UPDATE
app.put("/blogs/:id", function(req, res){
    // Sanitize the user input and update blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog) {
        if (err){
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
       if (err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
    });
});

// 404
app.get("*", function(req, res){
   res.status(404).send("Sorry, could not find the page.");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER STARTED");
});