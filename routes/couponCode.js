var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Address = require("../models/address");
var Customer =require("../models/customer");
var Coupon =require("../models/couponCode");
const nodemailer=require('nodemailer');
var request = require('request');
var randomize = require('randomatic');
var moment = require('moment-timezone');
var middleware = require("../middleware");
var schedule = require('node-schedule');
var CronJob = require('cron').CronJob;
var CronJobManager = require('cron-job-manager');

//asining job
// function startJob(){
//     var p = new CronJob('* 24 58 * * *', function() {
//       console.log('this id first job1');
//       p.stop();
//     }, null, true, 'Asia/Calcutta');
// }

//coupon code landing page
router.get("/",function(req,res){
	Coupon.find({}, function(err, allCoupon){
		if(err){
			console.log(err);
		} else {
			res.render("couponCode/couponcodes2", {allCoupon:allCoupon});
		}
	});
});

//add coupon code
router.post("/",function(req,res){
	console.log(req.body.status);
	var newcode = new Coupon({
    	couponCodeId: "CPD" + randomize('0', 10),
    	couponCodeName: req.body.couponCodeName.toLowerCase(),
    	type: req.body.type.toLowerCase(),
    	minValue: req.body.minValue,
    	valueAmount: req.body.valueAmount,
    	validForm: req.body.validForm,
    	validThrough: req.body.validThrough,
    	factor: req.body.factor
    });
	if(req.body.status === 'CONTINUE') {
		newcode.status = true;
	} else {
		newcode.status = false;
	}
    Coupon.create(newcode, function(err, coupon){
        if(err){
            req.flash('error', 'Something went wrong !!!');
            res.redirect("back");
        }else{
            req.flash('success', 'Created successfully');
            res.redirect("back");
        }
    });
});

//coupon code second page
router.get("/:id",middleware.isLoggedIn, function(req,res){
	Coupon.findById(req.params.id, function(err, coupon){
		if(err){
			req.flash('error', 'Something went wrong !!!');
            res.redirect("back");
		} else {
			res.render("couponCode/couponcodes",{coupon:coupon});
		}
	});
});

//coupon code second page
router.get("/search-coupon/search/:id",middleware.isLoggedIn, function(req,res){
	Coupon.find({"couponCodeId": req.params.id}, function(err, data){
		if(err){
			req.flash('error', 'Something went wrong !!!');
            res.redirect("back");
		} else {
			res.redirect("/coupon-code/" + data[0].id)
		}
	});
});

//deleting coupon code
router.delete("/delete/:couponId",middleware.isLoggedIn, function(req, res){
    Coupon.findByIdAndRemove(req.params.couponId, function(err, coupon){
        if(err){
			req.flash("error", err.message);
            req.redirect("back");
        } else {
            req.flash('error', 'Coupon deleted!');
            res.redirect("/coupon-code");
        }
    });
});

//update status
router.post("/status/:id",middleware.isLoggedIn, function(req,res){
    // var status= false;	
    // var newData = {status:status};

    // Coupon.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updated){
    //     if(err){
    //         req.flash("error", err.message);
    //         res.redirect("back");
    //         console.log(err);
    //     } else {
    //         req.flash("success","Success");
    //         res.redirect("back");
    //     }
	// });
	console.log("triped");
});

//search coupon
router.get("/search/coupon", function(req,res,next){
	var search = req.query.search;
	Coupon.find({
		couponCodeName:{
			$regex: new RegExp(search)
		}
	}, {
		_id: 0,
		__v: 0
	}, function(err,data){
		res.json(data);
	}).limit(10);
});
module.exports = router;