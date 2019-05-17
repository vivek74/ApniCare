var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Address = require("../models/address");
var Customer =require("../models/customer");
var Medicine = require("../models/medicine");
var Drug = require("../models/drugs");
var Item = require("../models/item");
var Manufacture = require("../models/manufacture");
const nodemailer=require('nodemailer');
var request = require('request');
var randomize = require('randomatic');
var moment = require('moment-timezone');
var middleware = require("../middleware");
var multer=require('multer');
var path= require('path');

//item panel
router.get("/",middleware.isLoggedIn, function(req,res){
    Medicine.find({}, function(err, medicineItem){
        if(err){
            console.log(err);
            req.flash('error', 'Something went wrong!');
            res.redirect("back");
        } else {
            res.render("item/itempanel", {medicineItem:medicineItem});
        }
    });
});

//manufacturer
router.get("/view/manufacturer",middleware.isLoggedIn, function(req,res){
    Medicine.find({}, function(err, data){
        if(err){
            console.log(err);
            req.flash('error', 'Something went wrong!');
            res.redirect("back");
        } else {
            res.render("item/manufacturer", {data:data});
        }
    });
});

//show items or medicine
router.get("/:id",middleware.isLoggedIn, function(req,res){
    Medicine.findById(req.params.id, function(err, medicine){
        if(err){
            console.log(err);
            req.flash('error', 'Something went wrong!');
            res.redirect("back");
        } else {
            res.render("item/itemview", {medicine:medicine});
        }
    });
}); 

router.get("/item-search/:medId",middleware.isLoggedIn, function(req,res){
    Medicine.find({"medicineId":req.params.medId}, function(err, medicine){
        if(err){
            console.log(err);
            req.flash('error', 'Something went worng!');
            res.redirect("back");
        } else {
            //res.render("item/itempanel", {medicine:medicine});
            console.log(medicine.id);
            res.redirect("/item/"+medicine[0].id);
        }
    });
});

//uploading medicine pic
// set storage engine
var storage=multer.diskStorage({
	destination: './public/uploads/',
	filename: function(req, file, cb){
		cb(null,file.originalname);
	}
});
//init upload

var upload=multer({storage: storage,fileFilter: function(req, file,cb){
		checkFileType(file,cb);
	}
}).array('myImage',4);

//check file type
function checkFileType(file,cb){
	//allowed ext
	var filetypes = /jpeg|jpg|png|gif/;
	//check ext
	var extname = filetypes.test(path.extname
		(file.originalname).toLowerCase());
	//check mime
	var mimetype=filetypes.test(file.mimetype);
	if(mimetype && extname){
		return cb(null, true);
	} else {
		cb('Error: Images Only!');
	}
}
//post medicine panel
router.post("/",middleware.isLoggedIn, function(req,res){
    console.log(req.body);
    upload(req, res, (err) =>{
		if(err){
            console.log(err);
            req.flash('error', 'error went');
            res.redirect("back");
		} else{
            var newmedicine = new Medicine({
                    created: moment.tz('Asia/Calcutta').format("YYYY-MM-DDTHH:MM:ss"),
                    medicineId: "MED" + randomize('0', 10),
                    medicineName: req.body.medicineName.toLowerCase(),
                    manufacturerName: req.body.manufacturerName,
                    drugs: req.body.drugs,
                    unitQty: req.body.unitQty,
                    packagingUnit1: req.body.packagingUnit1,
                    packagingUnit2: req.body.packagingUnit2,
                    mrp: req.body.mrp,
                    rate: req.body.rate,
                    medType: req.body.medType,
                    detailedInfo: req.body.detailedInfo,
                    mainlyPrescribedFor :req.body.mainlyPrescribedFor,
                    medDiscount:req.body.medDiscount
                });
                if(req.files[0] != undefined){
                    newmedicine.MedicineImage1 = "/uploads/"+req.files[0].filename;
                }
                if(req.files[1] != undefined){
                    newmedicine.MedicineImage2 = "/uploads/"+req.files[1].filename;
                }
                if(req.files[2] != undefined){
                    newmedicine.MedicineImage3 = "/uploads/"+req.files[2].filename;
                }
                if(req.files[3] != undefined){
                    newmedicine.MedicineImage4 = "/uploads/"+req.files[3].filename;
                }
                if(req.body.prescriptionNeeded==='on'){
                    newmedicine.prescriptionNeeded= true;
                }else {
                    newmedicine.prescriptionNeeded= false;
                }
                if(req.body.decimalNeeded==='on'){
                    newmedicine.decimalNeeded= true;
                }
                if(req.body.medType==='Branded'){
                    newmedicine.medType = true;
                } else {
                    newmedicine.medType = false;
                }
                Medicine.insertMany(newmedicine, function(err, medicine){
                if(err){
                    console.log(err);
                    req.flash('error', 'Something went worng!');
                    res.redirect("back");
                }else{
                    var count = 0;
                    var id ;
                    Manufacture.find({},function(err, found){
                        if(err){
                            console.log(err);
                        } else {
                            found.forEach(function(medicines){
                                if(medicines.name === req.body.manufacturerName){
                                    count = count +1;
                                    id = medicines.id;
                                }
                            });
                        }
                        if(count != "1"){
                            var newmedicine = new Manufacture({
                                name: req.body.manufacturerName,
                            });
                            var obj = { items : req.body.medicineName};
                            newmedicine.list = obj;
                            Manufacture.create(newmedicine, function(err, medicine){
                                if(err){
                                    console.log(err);
                                } else {
                                    req.flash('success', 'Created successfully');
                                    res.redirect("back");
                                }
                            });
                        } else {
                            var obj = { items : req.body.medicineName};
                            Manufacture.update({_id: id}, { $push: { list: obj} },function(err, found){
                                if(err){
                                    console.log(err);
                                    req.flash("error", err.message);
                                    res.redirect("back");
                                } else {
                                    req.flash("success", "Created successfully");
                                    res.redirect("back");	 
                                }
                            });
                        }
                    });
                }
            });
		}
    });
});

//enter medicine
router.get("/enter/enter-medicines",middleware.isLoggedIn, function(req,res){
	res.render("item/entermedicines");
});

//enter item
router.get("/enter/enter-item",middleware.isLoggedIn, function(req,res){
	res.render("item/enteritem");
});

//post route of enter item
router.post("/enter-item",middleware.isLoggedIn, function(req,res){
    upload(req, res, (err) =>{
		if(err){
            console.log(err);
            req.flash('error', 'error went');
            res.redirect("back");
		} else{
                var newitem = new Medicine({
                created: moment.tz('Asia/Calcutta').format("YYYY-MM-DDTHH:MM:ss"),
                medicineId: "ITM" + randomize('0', 10),
                medicineName: req.body.itemName.toLowerCase(),
                manufacturerName: req.body.manufacturerName,
                quantity: req.body.quantity,
                detailedInfo: req.body.detailedInfo,
                mrp: req.body.mrp,
                rate: req.body.mrp * req.body.unitQty,
                isItem: true
                });
                if(req.files[0] != undefined){
                    newitem.MedicineImage1 = "/uploads/"+req.files[0].filename;
                    }

                    if(req.files[1] != undefined){
                        newitem.MedicineImage2 = "/uploads/"+req.files[1].filename;
                    }
                    if(req.files[2] != undefined){
                        newitem.MedicineImage3 = "/uploads/"+req.files[2].filename;
                    }
                    if(req.files[3] != undefined){
                        newitem.MedicineImage4 = "/uploads/"+req.files[4].filename;
                    }
                if(req.file != undefined){
                    newitem.MedicineImage = "/uploads/"+req.file.filename;
                }
                newitem.decimalNeeded= false;
                Medicine.insertMany(newitem, function(err, item){
                    if(err){
                        console.log(err);
                        req.flash('error', 'Something went worng!');
                        res.redirect("back");
                    }else{
                        var count = 0;
                    var id ;
                    Manufacture.find({},function(err, found){
                        if(err){
                            console.log(err);
                        } else {
                            found.forEach(function(medicines){
                                if(medicines.name === req.body.manufacturerName){
                                    count = count +1;
                                    id = medicines.id;
                                }
                            });
                        }
                        if(count != "1"){
                            var newmedicine = new Manufacture({
                                name: req.body.manufacturerName,
                            });
                            var obj = { items : req.body.itemName};
                            newmedicine.list = obj;
                            Manufacture.create(newmedicine, function(err, medicine){
                                if(err){
                                    console.log(err);
                                } else {
                                    req.flash('success', 'Created successfully');
                                    res.redirect("back");
                                }
                            });
                        } else {
                            var obj = { items : req.body.itemName};
                            Manufacture.update({_id: id}, { $push: { list: obj} },function(err, found){
                                if(err){
                                    console.log(err);
                                    req.flash("error", err.message);
                                    res.redirect("back");
                                } else {
                                    req.flash("success", "Created successfully");
                                    res.redirect("back");	 
                                }
                            });
                        }
                    });
                    }
                });
			// }
		}
	});
    //ending image uploading
});

//enter salt
router.get("/enter/enter-salt",middleware.isLoggedIn, function(req,res){
	res.render("item/entersalt");
});

//post request
router.post("/enter-salt",middleware.isLoggedIn, function(req,res){
    var newdrug = new Drug({
    medicineId: "DRUG" + randomize('0', 10),
    name: req.body.name.toLowerCase(),
    usedFor: req.body.usedFor,
    working: req.body.working,
    medicineAvailable: req.body.medicineAvailable,
    faq: req.body.faq
    });
    Drug.insertMany(newdrug, function(err, drug){
        if(err){
            console.log(err);
            req.flash('error', 'Something went worng!');
            res.redirect("back");
        }else{
            console.log(drug);
            req.flash('success', 'Created successfully');
            res.redirect("back");
        }
    });
});

//searching in item
//search in user for phone number
router.get("/search/item", function(req,res,next){
    var search = req.query.search;
	Medicine.find({
		medicineName:{
			$regex: new RegExp(search)
		}
	}, {
		_id: 0,
		__v: 0
	}, function(err,data){
        //console.log(data);
		res.json(data);
	}).limit(10);
});

//manufacturer view
router.get("/view/manufacturer/show-list/:id", function(req, res){
    Manufacture.find({"name": req.params.id}, function(err,foundList){
        if(err){
            console.log(err);
        } else {
            res.render("item/manufacturerview",{foundList:foundList})
        }
    });
})

router.get("/view/manufacturer/show-med-list/:id", function(req, res){
    Medicine.find({"medicineName": req.params.id}, function(err,foundmed){
        if(err){
            console.log(err);
        } else {
            res.redirect("/item/"+foundmed[0].id);
        }
    });
})
module.exports = router;