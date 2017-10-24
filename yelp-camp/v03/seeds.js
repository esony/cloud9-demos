var mongoose    = require("mongoose");
var Camp        = require("./models/campground");
var Comment     = require("./models/comment");

// CAMP SEEDS
var data = [
    {
        name : "Gröna Udden", 
        image : "https://static.pexels.com/photos/176381/pexels-photo-176381.jpeg", 
        description: "Visit to Gröna Udden to fulfill your laziest day dreams"
        
    },
    {
        name : "Härmälä", 
        image : "https://static.pexels.com/photos/213807/pexels-photo-213807.jpeg",
        description: "Härmälä for life"
    },
    {   name : "Top Camping Vaasa", 
        image : "https://static.pexels.com/photos/388303/pexels-photo-388303.jpeg",
        description: "Top camping Vaasa DA BOMB"
    },
    {
        name : "Space", 
        image : "https://res.cloudinary.com/teepublic/image/private/s--PEKPlvV0--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1498672686/production/designs/1699412_1.jpg",
        description: "This one's in space, yo!"
    }
]

function seedDB(){
    // Remove all campgrounds
    Camp.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Campgrounds removed");
            
            // Add seed campgrounds
            data.forEach(function(seed){
                Camp.create(seed, function(err, campground){
                    if (err){
                        console.log(err);
                    } else {
                        console.log("Added a campground")
                        
                        // Create a comments
                        Comment.create(
                            {
                                text: "Dis camp da BOOMMMMMB",
                                author: "JC"
                                
                            }, function(err, comment){
                                if (err) {
                                    console.log(err)
                                    
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created a new comment")
                                }
                                
                            }
                        )
                    }
                });
            });
        }
    });

}

module.exports = seedDB;