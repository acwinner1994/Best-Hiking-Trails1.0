var mongoose=require("mongoose");
var Campground=require("./modules/campground");
var Comment=require("./modules/comment");
var data=[
       {
           name: "Granite Hill",
           image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
           description: "There’s been a sense by some that the administration hasn’t prioritized human rights in its broader foreign policy,” said Senator Marco Rubio, Republican of Florida. “I don’t think that’s necessarily accurate — but that sense has grown. There’s been a sense that Congress needs to step up.",
           author:{
             id:"5e0bd33018f537c8654be78c",
             username:"gfzlasonadora@gamil.com"
           }
       },
       {
           name: "Granite Hill",
           image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
           description: "“There’s been a sense by some that the administration hasn’t prioritized human rights in its broader foreign policy,” said Senator Marco Rubio, Republican of Florida. “I don’t think that’s necessarily accurate — but that sense has grown. There’s been a sense that Congress needs to step up.”",
           author:{
             id:"5e0bd33018f537c8654be78c",
             username:"gfzlasonadora@gamil.com"
           }

       },
       {
           name: "Granite Hill",
           image: "https://celebmafia.com/wp-content/uploads/2019/11/ariadna-majewska-photoshoot-november-2019-more-pics-5.jpg",
           description: "“There’s been a sense by some that the administration hasn’t prioritized human rights in its broader foreign policy,” said Senator Marco Rubio, Republican of Florida. “I don’t think that’s necessarily accurate — but that sense has grown. There’s been a sense that Congress needs to step up.”",
           author:{
             id:"5e0bd33018f537c8654be78c",
             username:"gfzlasonadora@gamil.com"
           }

       }
];
function seedDB(){
  //remove all campgrounds
  Campground.remove({},function(err){
    if(err){
        console.log(err);
        console.log("remove didn't complete!!!");
    }
    // else{
    //       console.log("else for remove ");
    //       console.log("else for remove ");
    //       console.log("else for remove ");
    //       console.log("else for remove ");
    //       console.log("else for remove ");
    //       console.log("else for remove ");
    //       console.log("else for remove ");
    //       console.log("else for remove ");
    //     }
      console.log("removed campgrounds!");
      data.forEach(function(seed){
        //add object to table campground
        Campground.create(seed,function(err,campground){
          if(err){
            console.log(err);
          }
          else{//added successful
              console.log("added a campground!");
              Comment.create(
                {
                  text:"this is a good place, but I wish I can have a white, young, model like linda be with me at the same time",
                  author: {
                    id:"5e0bd33018f537c8654be78c",
                    username:"gfzlasonadora@gamil.com"
                  }
                },
                function(err,comment){
                  if(err){
                    console.log(err);
                  }else{
              //comment is nested inside a campground
                    campground.comments.push(comment);
                    campground.save();
                    //console.log(campground);
                  }
                });
              }
            });
          });
          console.log("done with add comments");
    }
  );
}

module.exports=seedDB;
