var express = require("express");
var router = express.Router();
var passport = require("passport");
const nodemailer = require('nodemailer');
var request = require('request');
var randomize = require('randomatic');
var moment = require('moment-timezone');
var middleware = require("../middleware");
const uuid = require('uuid/v1');
let Suppliers = require("../models/supplierSchema");


function stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
}



router.get("/profile",middleware.isLoggedIn, (req, res) => {
    res.render("supplier/profile_view_supplier");
});

router.post("/profile/submit",middleware.isLoggedIn, (req, res) => {

    let supplier = new Suppliers({
        supplierId: uuid(),
        supplierName: req.body.supplier_name.toLowerCase(),
        supplierNumber: req.body.supplierNumber,
        city: req.body.city,
        address: req.body.mraddress,
        pincode: req.body.pincode,
        diNumber: req.body.dlnumber,
        expiration: stringToDate(req.body.expiration, "dd/MM/yyyy", "/"),
        email: req.body.email,
        contactPersonName: req.body.contactperson,
        contactPersonNumber: req.body.mobileperson,
        website: req.body.website,
        gstNumber: req.body.gstNumber
    });

    Suppliers.create(supplier, function (err, supplier) {
        if(err){
            req.flash('error', 'Something went wrong !!!');
            res.redirect("back");
        }else{
            req.flash('success', 'Created successfully');
            res.redirect("back");
        }
    });

});

router.post("/profile/edit/:id",middleware.isLoggedIn, (req, res) => {

    Suppliers.findOne({
        supplierId: req.params.id
    }).then(data => {
        let supplier = {
            supplierName: req.body.supplier_name,
            supplierNumber: req.body.supplierNumber,
            city: req.body.city,
            address: req.body.mr_address,
            pincode: req.body.pincode,
            diNumber: req.body.dl_number,
            expiration: stringToDate(req.body.expiration, "dd/MM/yyyy", "/"),
            email: req.body.email,
            contactPersonName: req.body.contact_person,
            contactPersonNumber: req.body.mobile_person,
            website: req.body.website,
            gstNumber: req.body.gstNumber
        };

        Suppliers.update(supplier, function (err, supplier) {
            if (err) {
                console.log(err);
            } else {
                res.contentType('json');
                res.send({
                    some: JSON.stringify({
                        response: 'json'
                    })
                });
            }
        });
    })
});

router.get('/all_supplier',middleware.isLoggedIn, (req, res) => {
    Suppliers.find({}).then(data => {
        res.render("supplier/all_supplier", {
            supplier: data
        })
    })
});

router.get('/:id/add_medicine',middleware.isLoggedIn, (req, res) => {
    Suppliers.find({
        "supplierId": req.params.id,
    }).exec((err, data) => {
        res.render("supplier/supplier_view", {
            supplier: data
        })
    })
});

router.get('/view_profile/:id',middleware.isLoggedIn, (req, res) => {
    Suppliers.find({
        "supplierId": req.params.id
    }).exec((err, data) => {
        res.render("supplier/view_profile", {
            supplier: data
        })
    })
});

router.get('/add_medicine/:id',middleware.isLoggedIn, (req, res) => {
    Suppliers.findOne({
        "supplierId": req.params.id
    }).then(data => {
        res.render("supplier/add_medicine", {
            supplier: data
        });
    })
});

router.get('/add_medicine_list/:id/:medicine',middleware.isLoggedIn, (req,res)=>{
    Suppliers.findOne({
        "supplierId": req.params.id
    }).then(data=>{
        data.medicineList.push(req.params.medicine);
        Suppliers.update({"_id":data._id},{"$set":{"medicineList":data.medicineList}},{"upset":true},(err,supplier)=>{
            if(err){
                console.log(err);
            } else {
                res.redirect("/supplier/add_medicine/"+data.supplierId);
            }
        })
    })
});

//supplier search
router.get("/search/vendor", function(req,res,next){
	var search = req.query.search;
	Suppliers.find({
		supplierName:{
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
