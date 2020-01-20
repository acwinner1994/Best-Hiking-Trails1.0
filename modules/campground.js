var mongoose    = require("mongoose");


// mongoose.connect("mongodb://localhost/yelp_camp");
// app.use(bodyParser.urlencoded({extended: true}));


var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   imageId: String,
   description: String,
   cost:Number,
   location:String,
   createdAt:{type:Date,default:Date.now},
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ],
   likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});


// // SCHEMA SETUP
// var campgroundSchema = new mongoose.Schema({
//
//   name: String,
//   image: String,
//   description: String,
//   cost:Number,
//   location:String,
//   createdAt:{type:Date,default:Date.now},
//   author:{
//     id:{
//       type:mongoose.Schema.Types.ObjectId,
//       ref:"user"
//     },
//     username:String
//   },
//   comments:[   //refer to comment id
//     {
//       type:mongoose.Schema.Types.ObjectId,
//       ref:"Comment"
//     }
//   ]
// });

var Campground = mongoose.model("Campground", campgroundSchema);

//send out a model which is a specific table to operate
module.exports=Campground;
