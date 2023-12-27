const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");



const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");
const controllerReview=require("../controller/review.js");
//create new review
router.post("/",isLoggedIn,validateReview,wrapAsync(controllerReview.postReview));

//delete review

router.delete("/:reviewid",isReviewAuthor,wrapAsync(controllerReview.destroyReview));


module.exports=router;