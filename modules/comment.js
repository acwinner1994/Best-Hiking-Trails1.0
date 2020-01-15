var mongoose    = require("mongoose");


var commentSchema=mongoose.Schema({
  text:String,
  createdAt:{type:Date,default:Date.now},
  author:{
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    },
    username:String
  }
});

//out put a model which is a table of comment.
module.exports=mongoose.model("Comment",commentSchema);
