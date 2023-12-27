const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveredirectUrl}=require("../middleware.js");
const controllerUser=require("../controller/user.js");

router.route("/signup")
.get(controllerUser.renderSignUpForm)
.post(wrapAsync(controllerUser.signUp));
router.route("/login")
.get(controllerUser.renderLogin)
.post(saveredirectUrl,passport.authenticate('local', { failureRedirect: '/login',failureFlash:true}),controllerUser.login);
//logout
router.get("/logout",controllerUser.logout);

module.exports=router;