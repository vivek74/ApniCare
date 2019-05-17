var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Address = require("../models/address");
var Customer =require("../models/customer");
var Medicine = require("../models/medicine");
var Item = require("../models/item");
const nodemailer=require('nodemailer');
var request = require('request');
var randomize = require('randomatic');
var moment = require('moment-timezone');
var middleware = require("../middleware");

//item panel
router.get("/",middleware.isLoggedIn, function(req,res){
	Medicine.find({}, function(err, allMedicine){
		if(err){
			console.log(err);
		} else {
			Item.find({}, function(err, allItems){
				if(err){
					console.log(err);
				} else {
					res.render("inventory/inventory", {allMedicine:allMedicine, allItems:allItems});
				}
			});	
		}
	});
});

//update medicines quantity
router.post("/:id",middleware.isLoggedIn, function(req,res){
	console.log(req.body.packagingUnit2 * req.body.unitQty);
	var unitQty = req.body.unitQty;
  	var mrp = req.body.mrp;
  	var packagingUnit2 = req.body.packagingUnit2;
  	var totalTablet = req.body.packagingUnit2 * req.body.unitQty;
  	var rate = req.body.mrp * req.body.unitQty;
  	var inventoryStatus = req.body.inventoryStatus;
  	
    var newData = {unitQty:unitQty, mrp:mrp, packagingUnit2:packagingUnit2, rate:rate, 
    totalTablet:totalTablet,inventoryStatus:inventoryStatus};

    Medicine.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedMedicine){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("back");
        }
    });
});

module.exports = router;