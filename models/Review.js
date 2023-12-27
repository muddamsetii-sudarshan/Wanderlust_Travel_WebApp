const mongoose=require("mongoose");
const User = require("./User");
const {Schema}=mongoose;
const ReviewSchema=Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

const Review=mongoose.model("Review",ReviewSchema);

module.exports=Review;