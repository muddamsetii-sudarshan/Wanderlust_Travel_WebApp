const Listing=require("../models/Listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient= mbxGeocoding({ accessToken: mapToken });




module.exports.index=async (req,res)=>{
    const allListings=await Listing.find({});
   res.render("listings/index.ejs",{allListings});
}

module.exports.newListingForm=(req,res)=>{
    res.render("listings/new.ejs");
 }

 module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    let listing =await Listing.findById(id).populate({path: "reviews",populate : {
     path: "author",
    }
 })
 .populate("owner");
    if(!listing){
     req.flash("error","Listing you requested for does not exist!");
     res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
 }

 module.exports.createListing=async(req,res,next)=>{
    let response=await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send()
    const newlisting=new Listing(req.body.listing);
    newlisting.image.url=req.file.path;
    newlisting.image.filename=req.file.filename;
    newlisting.owner=req.user._id;
    newlisting.geometry=response.body.features[0].geometry;
    let savedlisting=await newlisting.save();
    console.log(savedlisting);
    req.flash("success","New listing created!");
    res.redirect("/listings");    
}

module.exports.editListingForm=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    let originalUrl=listing.image.url;
    originalUrl=originalUrl.replace("/upload","/upload/w_300");
    console.log(originalUrl);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
       }
    res.render("listings/edit.ejs",{listing,originalUrl});
}

module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing})
        if(typeof req.file !=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
        }
            req.flash("success","Listing updated!");
            res.redirect(`/listings/${id}`);
       
}

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deletedlisting=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted!");
    res.redirect("/listings");
}