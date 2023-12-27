const Review=require("../models/Review.js");
const Listing=require("../models/Listing.js");
module.exports.postReview=async(req,res)=>{
    console.log(req.params.id);
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","Review created!");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewid}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid }});
    await Review.findByIdAndDelete(reviewid);
    req.flash("error","Review deleted!");
    res.redirect(`/listings/${id}`);
}