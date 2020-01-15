var mongoose    = require("mongoose");


// mongoose.connect("mongodb://localhost/yelp_camp");
// app.use(bodyParser.urlencoded({extended: true}));





// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  cost:Number,
  location:String,
  createdAt:{type:Date,default:Date.now},
  author:{
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    },
    username:String
  },
  comments:[   //refer to comment id
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Comment"
    }
  ]
});

var Campground = mongoose.model("Campground", campgroundSchema);

//send out a model which is a specific table to operate
module.exports=Campground;

// Campground.create(
//      {
//          name: "Granite Hill",
//          image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//          description: "This is a huge granite hill, no bathrooms.  No water. Beautiful granite!"
//
//      },
//      function(err, campground){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED CAMPGROUND: ");
//           console.log(campground);
//       }
//     });
