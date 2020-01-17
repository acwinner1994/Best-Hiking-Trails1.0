var express=require("express");
var router=express.Router();
var Campground  = require("../modules/campground");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/",function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});

//CREATE - add new campground to DB
router.post("/", function(req, res){

  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var cost = req.body.cost;
  var desc = req.body.description;
  var id=req.user._id;
  var username=req.user.username;
  var location=req.body.location;


  var newCampground = {name: name, image: image,location:location,cost:cost, description: desc,author:{
    id:id,
    username:username
  },};
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
      if(err){
          console.log(err);
      } else {
          //redirect back to campgrounds page
          res.redirect("/campgrounds");
      }
  });

});





//NEW - show form to create new campground
router.get("/new",middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new.ejs");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
      if(err){
          console.log(err);
      } else {
          console.log(foundCampground);
          //render show template with that campground
          res.render("campgrounds/show", {campground: foundCampground});
      }
    });
});

//edit
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
  //check if it isLoggedIn

    Campground.findById(req.params.id,function(err,foundCampground){
      if(err){
        res.redirect("/campgrounds")
      }else
      //check if it owns the campground
        res.render("campgrounds/edit",{campground:foundCampground});

    });



});

//update
router.put("/:id",function(req,res){
  Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
    if(err){
      res.redirect("/campgrounds");
    }else{
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
});

//delete
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
  Campground.findByIdAndRemove(req.params.id,function(err){
      res.redirect("/campgrounds");
  });
});



module.exports=router;
