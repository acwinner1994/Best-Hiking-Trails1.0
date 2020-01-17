var express=require("express");
var router=express.Router();
var Campground  = require("../modules/campground");
var middleware = require("../middleware");

var request = require("request");
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'du4bigyf7',
  api_key: '934946645218272',
  api_secret: 'iIrdTeqggzc7wJhq-fE1_uxg9G8'
});

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
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res) {
    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
      if(err) {
        req.flash('error', err.message);
        return res.redirect('back');
      }
      // add cloudinary url for the image to the campground object under image property
      req.body.campground.image = result.secure_url;
      // add image's public_id to campground object
      req.body.campground.imageId = result.public_id;
      // add author to campground
      req.body.campground.author = {
        id: req.user._id,
        username: req.user.username
      }
      Campground.create(req.body.campground, function(err, campground) {
        if (err) {
          req.flash('error', err.message);
          return res.redirect('back');
        }
        res.redirect('/campgrounds/' + campground.id);
      });
    });
});

// //CREATE - add new campground to DB
// router.post("/", function(req, res){
//
//   // get data from form and add to campgrounds array
//   var name = req.body.name;
//   var image = req.body.image;
//   var cost = req.body.cost;
//   var desc = req.body.description;
//   var id=req.user._id;
//   var username=req.user.username;
//   var location=req.body.location;
//
//
//   var newCampground = {name: name, image: image,location:location,cost:cost, description: desc,author:{
//     id:id,
//     username:username
//   },};
//   // Create a new campground and save to DB
//   Campground.create(newCampground, function(err, newlyCreated){
//       if(err){
//           console.log(err);
//       } else {
//           //redirect back to campgrounds page
//           res.redirect("/campgrounds");
//       }
//   });
//
// });





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
