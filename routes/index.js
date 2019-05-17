var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
const nodemailer=require('nodemailer');
var request = require('request');
var randomize = require('randomatic');
var moment = require('moment-timezone');
var middleware = require("../middleware");


//login
router.get("/", function(req,res){
  res.render("login");
});

//register
router.get("/register", function(req, res){
  res.render("signup");
});

//post register
router.post("/register", function(req,res){
  var newUser = new User({
    username: req.body.username,
    phone: req.body.username,
    password: req.body.password,
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("signup", {error: err.message});
        }else{
        	res.redirect("/user-login");
        }
    });
});

//post login
router.post("/", passport.authenticate("local", 
    {
        failureRedirect: "/",
        failureFlash: true,
    }), function(req, res){
    res.redirect("/users");
});

//logout
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success","Successfully Logged Out!");
   res.redirect("/");
}); 

//user-login
router.get("/user-login",middleware.isLoggedIn, function(req, res){
  res.send(`<a href="/logout">logout<a>`);
});




module.exports = router;
