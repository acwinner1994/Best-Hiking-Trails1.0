var express=require("express");
var router=express.Router();
var passport    = require("passport");
var User        = require("../modules/user");

router.get("/", function(req, res){
    res.render("landing");
});

//===========
//NEW_user
//===========
router.get("/register",function(req,res){
  res.render("register");
});

//user created here, and this will be put into sessions
router.post("/register",function(req,res){
  User.register(new User({username:req.body.username}),
  req.body.password,function(err,user){
      if(err){
        console.log(err);
        req.flash("error",err.message);
        return res.render('register');
      }
      passport.authenticate("local")(req,res,function(){
        req.flash("success","new user created");
        res.redirect("/campgrounds");
      });
  });
});

router.get("/login",function(req,res){
  res.render("login");
});

router.post("/login",passport.authenticate("local",{
  successRedirect:"/campgrounds",
  failureRedirect:"/login"
}),function(req,res){
});

router.get("/logout",function(req,res){
  req.logout();
  req.flash("success","logged you out");
  res.redirect("/campgrounds");
});


module.exports=router;