YELP CAMP APP
RESTFUL ROUTES

CAMPS
Name        url                         method          Description
============================================================================================
INDEX       /camps                      GET             Display a list of all camps
NEW         /camps/new                  GET             Display form to add a new camp
CREATE      /camps                      POST            Add new camp to DB
SHOW        /camps/:id                  GET             Show info about camp specified by id
            

COMMENTS
Name        url                         method          Description
============================================================================================
INDEX       /camps                      GET             Display a list of all camps
NEW         /camps/:id/comments/new     GET             Display form to add a new camp
CREATE      /camps/:id/comments         POST            Add new camp to DB
SHOW        /camps/:id                  GET             Show info about camp specified by id