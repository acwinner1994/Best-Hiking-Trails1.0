var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    //？1
    methodOverride=require("method-override"),
    //for put request
    Comment     = require("./modules/comment"),
    Campground  = require("./modules/campground"),
    seedDB      = require("./seeds"),
    passport    = require("passport"),
    localStrategy= require("passport-local"),
    flash       = require("connect-flash"),
    User        = require("./modules/user");


    //requiring routes
    var commentRoutes=require("./routes/comments");
    var campgroundRoutes=require("./routes/campgrounds");
    var indexRoutes=require("./routes/index");

  //database connect
  mongoose.connect("mongodb+srv://admin:test123@cluster0-b4qcr.mongodb.net/Currency_exchangeDB",{useNewUrlParser:true});

//
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
//？2
app.use(methodOverride("_method"));//?
app.use(flash());

app.use(require("express-session")({
secret:"i will do whatever I can to fuck a beatiful white young girl",
resave:false,
saveUninitialized:false
}));
app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

seedDB();

//middle ware that apply to every routes
app.use(function(req,res,next){
  //res.locals is the objects to pass in, req.user return current user.
  res.locals.currentUser=req.user;
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success");
  next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT||3001, function(){
   console.log("The YelpCamp Server Has Started!");
});


// <% if(currentUser && comment.author.id.equals(currentUser._id)){ %>
//     <% } %>
