const express= require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const Listing=require("../models/Listing.js");
const User=require("../models/User.js");
const {isLoggedIn,isOwner}=require("../middleware.js");
const controllerListing=require("../controller/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage });
//schema validation using joi 
// const validateListing=(req,res,next)=>{
//     let {error}=listingSchema.validate(req.body);
//     console.log(error);
//     if(error){
//         let errMsg=error.details.map((el)=>el.message).join(",");//its not working
//         throw new ExpressError(400,errMsg);
//         //throw new ExpressError(400,result.error)
//     }
//     else{
//         next();
//     }
// }
//create route,index route
router.route("/")
.get(wrapAsync(controllerListing.index))
.post(isLoggedIn,upload.single('listing[image]'),wrapAsync(controllerListing.createListing));


//new route renders a new fresh form
router.get("/new",isLoggedIn,controllerListing.newListingForm);

//show route,update route,delete route
router.route("/:id")
.get(wrapAsync(controllerListing.showListing))
.put(isOwner,upload.single('listing[image]'),wrapAsync(controllerListing.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(controllerListing.destroyListing));

//edit route renders form
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(controllerListing.editListingForm));

module.exports=router;