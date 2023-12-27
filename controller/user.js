const User=require("../models/User.js");
module.exports.renderSignUpForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signUp=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
    let newUser=new User({
        email,
        username
    });
    let saveduser=await User.register(newUser,password);
    //console.log(saveduser);
    req.login(saveduser,(er)=>{
        if(er){
            return next(er);
        }else{
            req.flash("success","Welcome to wanderlust!");
            res.redirect("/listings");
        }
    })  
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
}

module.exports.renderLogin=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to wanderlust!");
    let redi=res.locals.redirectUrl || "/listings"
    return res.redirect(redi);
}

module.exports.logout=(req,res)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged you out");
        res.redirect("/listings");
    })
}