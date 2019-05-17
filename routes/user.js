var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Address = require("../models/address");
var Customer =require("../models/customer");
var Prescription =require("../models/prescription");
var MyMedicine =require("../models/myMedicine");
var Record = require("../models/records");
var Invoice = require("../models/invoice");
var Member = require("../models/member");
var Order = require("../models/order");
const nodemailer=require('nodemailer');
var request = require('request');
var randomize = require('randomatic');
var moment = require('moment-timezone');
var middleware = require("../middleware");
var schedule = require('node-schedule');
var CronJob = require('cron').CronJob;
var CronJobManager = require('cron-job-manager');
var multer=require('multer');
var path= require('path');


//users
router.get("/",middleware.isLoggedIn, function(req,res){
	Customer.find({}, function(err, customer){
		if(err){
			console.log(err);
		} else {
			Customer.count().exec(function(err,all){
				if(err){
					console.log(err);
				} else {
					Customer.find({"userType":"NFC"}).count().exec(function(err,nfc){
						if(err){
							console.log(err);
						} else {
							Customer.find({"userType":"HFC"}).count().exec(function(err,hfc){
								if(err){
									console.log(err);
								} else {
									Customer.find({"userType":"LFC"}).count().exec(function(err,lfc){
										if(err){
											console.log(err);
										} else {
											Customer.find({"isSuspended": true}).count().exec(function(err,suspended){
												if(err){
													console.log(err);
												}else{
													Customer.find({"userState": true}).count().exec(function(err,userstate){
														if(err){
															console.log(err);
														} else {
															
															res.render("user/users", {customer:customer, all:all, nfc:nfc, hfc:hfc, lfc:lfc, suspended:suspended, userstate:userstate });
														}
													})	
												}
											})							
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

// show HFC coustmer
router.get("/hfc",middleware.isLoggedIn, function(req,res){
	Customer.find({}, function(err, customer){
		if(err){
			console.log(err);
		} else {
			Customer.count().exec(function(err,all){
				if(err){
					console.log(err);
				} else {
					Customer.find({"userType":"NFC"}).count().exec(function(err,nfc){
						if(err){
							console.log(err);
						} else {
							Customer.find({"userType":"HFC"}).count().exec(function(err,hfc){
								if(err){
									console.log(err);
								} else {
									Customer.find({"userType":"LFC"}).count().exec(function(err,lfc){
										if(err){
											console.log(err);
										} else {
											Customer.find({"isSuspended": true}).count().exec(function(err,suspended){
												if(err){
													console.log(err);
												}else{
													Customer.find({"userState": true}).count().exec(function(err,userstate){
														if(err){
															console.log(err);
														} else {
															Customer.find({"userType":"HFC"}, function(err, hfcCustomer){
																if(err){
																	console.log(err);
																} else {
																	res.render("user/hfc", {hfcCustomer:hfcCustomer, customer:customer, all:all, nfc:nfc, hfc:hfc, lfc:lfc, suspended:suspended, userstate:userstate });
																}
															});
														}
													})	
												}
											})							
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

// show nfc coustmer
router.get("/nfc",middleware.isLoggedIn, function(req,res){
	Customer.find({}, function(err, customer){
		if(err){
			console.log(err);
		} else {
			Customer.count().exec(function(err,all){
				if(err){
					console.log(err);
				} else {
					Customer.find({"userType":"NFC"}).count().exec(function(err,nfc){
						if(err){
							console.log(err);
						} else {
							Customer.find({"userType":"HFC"}).count().exec(function(err,hfc){
								if(err){
									console.log(err);
								} else {
									Customer.find({"userType":"LFC"}).count().exec(function(err,lfc){
										if(err){
											console.log(err);
										} else {
											Customer.find({"isSuspended": true}).count().exec(function(err,suspended){
												if(err){
													console.log(err);
												}else{
													Customer.find({"userState": true}).count().exec(function(err,userstate){
														if(err){
															console.log(err);
														} else {
															Customer.find({"userType":"NFC"}, function(err, nfcCustomer){
																if(err){
																	console.log(err);
																} else {
																	res.render("user/nfc", {nfcCustomer:nfcCustomer, customer:customer, all:all, nfc:nfc, hfc:hfc, lfc:lfc, suspended:suspended, userstate:userstate });
																}
															});			
														}
													})	
												}
											})							
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

//show lfc coustmer
router.get("/lfc",middleware.isLoggedIn, function(req,res){
	Customer.find({}, function(err, customer){
		if(err){
			console.log(err);
		} else {
			Customer.count().exec(function(err,all){
				if(err){
					console.log(err);
				} else {
					Customer.find({"userType":"NFC"}).count().exec(function(err,nfc){
						if(err){
							console.log(err);
						} else {
							Customer.find({"userType":"HFC"}).count().exec(function(err,hfc){
								if(err){
									console.log(err);
								} else {
									Customer.find({"userType":"LFC"}).count().exec(function(err,lfc){
										if(err){
											console.log(err);
										} else {
											Customer.find({"isSuspended": true}).count().exec(function(err,suspended){
												if(err){
													console.log(err);
												}else{
													Customer.find({"userState": true}).count().exec(function(err,userstate){
														if(err){
															console.log(err);
														} else {


															Customer.find({"userType":"HFC"}, function(err, hfcCustomer){
																if(err){
																	console.log(err);
																} else {
																	Customer.find({"userType":"NFC"}, function(err, nfcCustomer){
																		if(err){
																			console.log(err);
																		} else {
																			Customer.find({"userType":"LFC"}, function(err, lfcCustomer){
																				if(err){
																					console.log(err);
																				} else {
																					res.render("user/lfc", {lfcCustomer:lfcCustomer, customer:customer, all:all, nfc:nfc, hfc:hfc, lfc:lfc, suspended:suspended, userstate:userstate });
																				}
																			});
																			
																		}
																	});	
																}
															});


														}
													})	
												}
											})							
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

//show suspended coustmer
router.get("/suspended-user",middleware.isLoggedIn, function(req,res){
	Customer.find({}, function(err, customer){
		if(err){
			console.log(err);
		} else {
			Customer.count().exec(function(err,all){
				if(err){
					console.log(err);
				} else {
					Customer.find({"userType":"NFC"}).count().exec(function(err,nfc){
						if(err){
							console.log(err);
						} else {
							Customer.find({"userType":"HFC"}).count().exec(function(err,hfc){
								if(err){
									console.log(err);
								} else {
									Customer.find({"userType":"LFC"}).count().exec(function(err,lfc){
										if(err){
											console.log(err);
										} else {
											Customer.find({"isSuspended": true}).count().exec(function(err,suspended){
												if(err){
													console.log(err);
												}else{
													Customer.find({"userState": true}).count().exec(function(err,userstate){
														if(err){
															console.log(err);
														} else {
															Customer.find({"userType":"HFC"}, function(err, hfcCustomer){
																if(err){
																	console.log(err);
																} else {
																	Customer.find({"userType":"NFC"}, function(err, nfcCustomer){
																		if(err){
																			console.log(err);
																		} else {
																			Customer.find({"userType":"LFC"}, function(err, lfcCustomer){
																				if(err){
																					console.log(err);
																				} else {
																					Customer.find({"isSuspended": true}, function(err, suspendedCustomer){
																						if(err){
																							console.log(err);
																						} else {
																							res.render("user/suspended", {suspendedCustomer:suspendedCustomer, customer:customer, all:all, nfc:nfc, hfc:hfc, lfc:lfc, suspended:suspended, userstate:userstate });
																						}
																					});
																					
																				}
																			});
																			
																		}
																	});
																	
																}
															});
														}
													})	
												}
											})							
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

//show pending coustmer
router.get("/pending-user",middleware.isLoggedIn, function(req,res){
	Customer.find({}, function(err, customer){
		if(err){
			console.log(err);
		} else {
			Customer.count().exec(function(err,all){
				if(err){
					console.log(err);
				} else {
					Customer.find({"userType":"NFC"}).count().exec(function(err,nfc){
						if(err){
							console.log(err);
						} else {
							Customer.find({"userType":"HFC"}).count().exec(function(err,hfc){
								if(err){
									console.log(err);
								} else {
									Customer.find({"userType":"LFC"}).count().exec(function(err,lfc){
										if(err){
											console.log(err);
										} else {
											Customer.find({"isSuspended": true}).count().exec(function(err,suspended){
												if(err){
													console.log(err);
												}else{
													Customer.find({"userState": true}).count().exec(function(err,userstate){
														if(err){
															console.log(err);
														} else {
															Customer.find({"userType":"HFC"}, function(err, hfcCustomer){
																if(err){
																	console.log(err);
																} else {
																	Customer.find({"userType":"NFC"}, function(err, nfcCustomer){
																		if(err){
																			console.log(err);
																		} else {
																			Customer.find({"userType":"LFC"}, function(err, lfcCustomer){
																				if(err){
																					console.log(err);
																				} else {
																					Customer.find({"userState": true}, function(err, pendingCustomer){
																						if(err){
																							console.log(err);
																						} else {
																							res.render("user/pending", {pendingCustomer:pendingCustomer, customer:customer, all:all, nfc:nfc, hfc:hfc, lfc:lfc, suspended:suspended, userstate:userstate });
																						}
																					});
																					
																				}
																			});
																			
																		}
																	});
																	
																}
															});
														}
													})	
												}
											})							
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

//user-view
router.get("/user-view/:id",middleware.isLoggedIn, function(req,res){
	Customer.findById(req.params.id, function(err, customer){
		if(err){
			console.log(err);
		} else {
			res.render("user/userView",{customer:customer});
		}
	});
});

//add money to wallet
router.post("/add-money/:id",middleware.isLoggedIn, function(req,res){
	Customer.findById(req.params.id, function(err, data){
		if(err){
			console.log(err);
		} else {
			var walletAccount = Number(data.walletAccount) + Number(req.body.walletAccount);
			var newData = {walletAccount:walletAccount};
			console.log(newData);
			Customer.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, newWallet){
				if(err){
					req.flash("error", err.message);
					res.redirect("back");
					console.log(err);
				} else {
					req.flash("success","Successfully added" + " " + "Rs" + " " + req.body.walletAccount + " " + "to user account.");
					res.redirect("back");
				}
			});
		}
	});
});

//view-profile
router.get("/user-view/profile/:id",middleware.isLoggedIn, function(req,res){
	Customer.findById(req.params.id).populate("addresses").exec(function(err, customer){
		if(err){
			console.log(err);
		} else {
			res.render("user/profile",{customer:customer});
		}
	});
});

//health-records
router.get("/user-view/health-record/:id",middleware.isLoggedIn, function(req,res){
	Customer.findById(req.params.id, function(err, customer){
		if(err){
			console.log(err);
		} else {
			res.render("user/healthRecords",{customer:customer});
		}
	});
});

//my-medicine
router.get("/user-view/my-medicines/:id",middleware.isLoggedIn, function(req,res){
	var customer = req.params.id;
	Customer.findById(customer).populate("mymedicines").exec(function(err, foundCustomer){
		if(err){
			console.log(err);
		} else {
			Order.find({"contactNumber": foundCustomer.phone}, function(err, buyedMedicine){
				if(err){
					console.log(err);
				} else {
					//console.log(buyedMedicine);
					res.render("user/myMedicines",{customer:customer, foundCustomer:foundCustomer, buyedMedicine: buyedMedicine});
				}
			})
		}
	});
});

//my-medicine post request
router.post("/user-view/my-medicines/:id",middleware.isLoggedIn, function(req,res){
	Customer.findById(req.params.id, function(err, customer_add){
		if(err){
			console.log(err);
			req.flash('error', 'Something went worng!');
			res.redirect("back");
		} else {	
			var newmymedicine = new MyMedicine({
			created: moment.tz('Asia/Calcutta').format("YYYY-MM-DDTHH:MM:ss"),
			medicineName: req.body.medicineName.toLowerCase(),
			qty: req.body.qty,
			manufacturarName: req.body.manufacturarName.toLowerCase(),
			mrp: req.body.mrp
			});
			MyMedicine.create(newmymedicine, function(err, mymed){
				if(err){
					console.log(err);
					req.flash('error', 'Something went worng!');
					res.redirect("back");
				}else{
					customer_add.mymedicines.push(mymed);
					customer_add.save();
					req.flash('success', 'Created successfully');
					res.redirect("back");	
				}
			});
		}
	})
});

//delete my medicine details
router.delete("/user-view/health-record/my-medicine/delete-med/:customer/:medicineId",middleware.isLoggedIn,function(req, res){
    MyMedicine.findByIdAndRemove(req.params.medicineId, function(err, recordInfo){
        if(err){
            console.log(err);
            req.redirect("back");
        } else {
            Customer.findByIdAndUpdate(req.params.customer, {
              $pull: {
                mymedicines: recordInfo.id
              }
            }, function(err) {
              if(err){ 
                console.log(err)
              } else {
                req.flash('error', 'Record deleted!');
                res.redirect("back");
              }
            });
        }
	});
});

//profile/health-details
router.get("/user-view/profile/health-details/:id",middleware.isLoggedIn, function(req,res){
	Customer.findById(req.params.id).populate("addresses").exec(function(err, customer){
		if(err){
			console.log(err);
		} else {
			res.render("user/allThree",{customer:customer});
		}
	});
});

//profile/lifestyle
router.get("/user-view/profile/lifestyle/:id",middleware.isLoggedIn, function(req,res){
	Customer.findById(req.params.id).populate("addresses").exec(function(err, customer){
		if(err){
			console.log(err);
		} else {
			res.render("user/allThree",{customer:customer});
		}
	});
});

//profile/my-address
router.get("/user-view/profile/my-address/:id",middleware.isLoggedIn, function(req,res){
	Customer.findById(req.params.id).populate("addresses").exec(function(err, customer){
		if(err){
			console.log(err);
		} else {
			res.render("user/allThree",{customer:customer});
		}
	});
});

// /users/user-view/health-record
router.get("/user-view/health-record/my-prescription/:id",middleware.isLoggedIn, function(req,res){
	var customer = req.params.id;
	Customer.findById(req.params.id).populate("prescriptions").exec(function(err, allprescription){
		if(err){
			console.log(err);
		} else {
			res.render("user/myPrescription",{allprescription:allprescription, customer:customer});
		}
	});
});

// /users/user-view/
router.get("/user-view/health-record/my-record/:id",middleware.isLoggedIn, function(req,res){
	var customer = req.params.id;
	Customer.findById(req.params.id).populate("records").exec(function(err, allrecords){
		if(err){
			console.log(err);
		} else {
			res.render("user/myRecord",{allrecords:allrecords, customer:customer});
		}
	});
});

// add user (post method)
router.post("/add-user",middleware.isLoggedIn, function(req,res){
	var newcustomer = new Customer({
  	joinedAt: moment.tz('Asia/Calcutta').format("YYYY-MM-DDTHH:MM:ss"),
  	userId: "CUST" + randomize('0', 10),
    username: req.body.username,
	phone: req.body.username,
	name: req.body.name,
	requestedUserType: req.body.requestedUserType,
	});
	if(req.body.requestedUserType === 'HFC') {
		newcustomer.userState = false;
	}
    Customer.create(newcustomer, function(err, customer){
        if(err){
			req.flash("error","Something went Wrong!");
            res.redirect("back");
        }else{
			req.flash("success","Created successfully");
        	res.redirect("back");
        }
    });
});

//universnal update
router.post("/update/:id",middleware.isLoggedIn, function(req,res){
	
    var email= req.body.email;
    var alternateNumber= req.body.alternatePhone;
    var atulyaCard= req.body.atulyaCard;
    var rationCard= req.body.rationCard;
    var adharCard= req.body.adharCard;
    var gender= req.body.gender;
	var userType= req.body.userType;
	var city = req.body.city;
    //health
    var allergies= req.body.allergies;
    var currentMedication= req.body.currentMedication;
    var pastMedication= req.body.pastMedication;
    var chronicDiseases= req.body.chronicDiseases;
    var injuries=req.body.injuries;
    var surgeries=req.body.surgeries;
    //lifeStyle
    var smokingHabit=req.body.smokingHabit;
    var alcoholConsumption= req.body.alcoholConsumption; 
    var activitylevel= req.body.activitylevel;
    var foodPreference= req.body.foodPreference; 
	var occupation= req.body.occupation;
		
    var newData = {allergies:allergies, currentMedication:currentMedication, pastMedication:pastMedication,
	chronicDiseases:chronicDiseases,injuries:injuries,surgeries:surgeries,email:email,
	alternateNumber:alternateNumber,atulyaCard:atulyaCard,rationCard:rationCard,gender:gender,userType:userType,city:city,adharCard:adharCard,smokingHabit:smokingHabit,
	alcoholConsumption:alcoholConsumption,activitylevel:activitylevel,foodPreference:foodPreference,occupation:occupation};

    Customer.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updated){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
            console.log(err);
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("back");
        }
    });
});

//add address in array
router.post("/add-address/:id",middleware.isLoggedIn, function(req,res){
	var addressLine1= req.body.addressLine1.toLowerCase();
    var addressLine2= req.body.addressLine2;
	var landmark= req.body.landmark;
	var pin = req.body.pin;
    var city= req.body.city.toLowerCase();
    var state= req.body.states.toLowerCase(); //dropdown options
    var country= req.body.country.toLowerCase();

    var newData = {addressLine1:addressLine1, addressLine2:addressLine2, landmark:landmark,
    	city:city, state:state, country:country, pin:pin};

    Customer.findById(req.params.id, function(err, found){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            Address.create(newData, function(err,added){
            	if(err){
            		console.log(err)
            	} else {
	            	found.addresses.push(added);
					found.save();
					req.flash("success", "Address created");
	            	res.redirect("back");	
            	}
            })
        }
    });
});

//delete address
router.delete("/delete/:customerId/add/:addressid",middleware.isLoggedIn, function(req, res){
    Address.findByIdAndRemove(req.params.addressid, function(err, address){
        if(err){
			console.log(err);
			req.flash("error", err.message);
            req.redirect("back");
        } else {
            Customer.findByIdAndUpdate(req.params.customerId, {
              $pull: {
                addresses: address.id
              }
            }, function(err) {
              if(err){ 
                console.log(err)
              } else {
                req.flash('error', 'Address deleted!');
                res.redirect("back");
              }
            });
        }
    });
});

//suspend user
router.get("/suspend/:id",middleware.isLoggedIn, function(req,res){
    var isSuspended= true;	
    var newData = {isSuspended:isSuspended};

    Customer.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updated){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
            console.log(err);
        } else {
            req.flash("success","Success");
            res.redirect("back");
        }
    });
});

//continue customer
router.get("/continue/:id",middleware.isLoggedIn, function(req,res){
    var isSuspended= false;	
    var newData = {isSuspended:isSuspended};

    Customer.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updated){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
            console.log(err);
        } else {
            req.flash("success","Success");
            res.redirect("back");
        }
    });
});

//approve user
router.post("/approve/:id",middleware.isLoggedIn, function(req,res){
    var userState= false;	
    var newData = {userState:userState};
    Customer.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updated){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
            console.log(err);
        } else {
            req.flash("success","Success");
            res.redirect("back");
        }
    });
});

// //search in user for phone number
// router.get("/search/user",middleware.isLoggedIn, function(req,res,next){
// 	var search = req.query.search;
// 	Customer.find({phone:{$regex: new RegExp(search)}}, {_id: 0,__v: 0}, function(err,data){
// 		res.json(data);
// 	}).limit(10);
// });

//search in user for phone number
router.get("/search/user",middleware.isLoggedIn, function(req,res,next){
	var search = req.query.search;
	Customer.find( { $or: [ {phone:{$regex: new RegExp(search)}}, {atulyaCard:{$regex: new RegExp(search)}} , {name: {$regex: new RegExp(search)}} ]}, function(err,data){
		res.json(data);
	}).limit(10);
});


//href of searched results
router.get("/searchResult/:id",middleware.isLoggedIn, function(req,res){
	console.log(req.params.id)
	Customer.find({"phone": req.params.id}, function(err, search){
		if(err){
			console.log(err);
		} else {
			//console.log(search[0].id);
			res.redirect("/users/user-view/"+search[0].id)
		}
	});
});

//pic upload

// set storage engine
var storage=multer.diskStorage({
	destination: './public/uploads/',
	filename: function(req, file, cb){
		cb(null,file.originalname);
	}
});
//init upload
var upload=multer({
	storage: storage,
	fileFilter: function(req, file,cb){
		checkFileType(file,cb);
	}
}).single('myImage');

//check file type
function checkFileType(file,cb){
	//allowed ext
	var filetypes = /jpeg|jpg|png|gif|pdf/;
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

//uploading aadhar image
router.post("/upload/aadhar/:id",middleware.isLoggedIn,function(req,res){
	upload(req, res, (err) =>{
		if(err){
			res.redirect('back',{
				msg:err
			});
		} else{
			if(req.file == undefined){
				res.redirect('back',{
					msg:'Error: No File Selected!'
				});
			} else {
				var adharCardPicFront= "/uploads/"+req.file.filename;	
				var newData = {adharCardPicFront:adharCardPicFront};
				Customer.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updated){
					if(err){
						req.flash("error", err.message);
						res.redirect("back");
					} else {
						res.redirect("back");
					}
				});
			}
		}
	});
});

//uploading aadhar back image
router.post("/upload/aadhar-back/:id",middleware.isLoggedIn,function(req,res){
	upload(req, res, (err) =>{
		if(err){
			res.redirect('back',{
				msg:err
			});
		} else{
			if(req.file == undefined){
				res.redirect('back',{
					msg:'Error: No File Selected!'
				});
			} else {
				var adharCardPicBack= "/uploads/"+req.file.filename;	
				var newData = {adharCardPicBack:adharCardPicBack};
				Customer.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updated){
					if(err){
						req.flash("error", err.message);
						res.redirect("back");
					} else {
						res.redirect("back");
					}
				});
			}
		}
	});
});

//uploading image of ration card
router.post("/upload/ration/:id",middleware.isLoggedIn,function(req,res){
	upload(req, res, (err) =>{
		if(err){
			res.redirect('back',{
				msg:err
			});
		} else{
			if(req.file == undefined){
				res.redirect('back',{
					msg:'Error: No File Selected!'
				});
			} else {
				var rationCardPicFront= "/uploads/"+req.file.filename;	
				var newData = {rationCardPicFront:rationCardPicFront};
				Customer.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updated){
					if(err){
						req.flash("error", err.message);
						res.redirect("back");
					} else {
						res.redirect("back");
					}
				});
			}
		}
	});
});

//uploading image of ration back card
router.post("/upload/ration-back/:id",middleware.isLoggedIn,function(req,res){
	upload(req, res, (err) =>{
		if(err){
			res.redirect('back',{
				msg:err
			});
		} else{
			if(req.file == undefined){
				res.redirect('back',{
					msg:'Error: No File Selected!'
				});
			} else {
				var rationCardPicBack= "/uploads/"+req.file.filename;	
				var newData = {rationCardPicBack:rationCardPicBack};
				Customer.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updated){
					if(err){
						req.flash("error", err.message);
						res.redirect("back");
					} else {
						res.redirect("back");
					}
				});
			}
		}
	});
});


//uploading image prescription
router.post("/user-view/health-record/my-prescription/add-prec/:id",middleware.isLoggedIn,function(req,res){
	upload(req, res, (err) =>{
		if(err){
			res.redirect('back',{
				msg:err
			});
		} else{
			if(req.file == undefined){
				res.redirect('back',{
					msg:'Error: No File Selected!'
				});
			} else {
				Customer.findById(req.params.id, function(err, customer_add){
					if(err){
						console.log(err);
					} else {
						var image= "/uploads/"+req.file.filename;	
						var newpres = new Prescription({
						created: moment.tz('Asia/Calcutta').format("YYYY-MM-DDTHH:MM:ss"),
						prescriptionId: randomize('0', 5),
						patientName: req.body.patientName,
						phoneNumber: req.body.phoneNumber,
						relation: req.body.relation,
						doctorName: req.body.doctorName,
						medicines: req.body.medicines,
						prescriptionImage: image
						});
						Prescription.create(newpres, function(err, pres){
							if(err){
								console.log(err);
								req.flash('error', 'Something went worng!');
								res.redirect("back");
							}else{
								console.log(pres);
								customer_add.prescriptions.push(pres);
								customer_add.save();
								req.flash('success', 'Created successfully');
								res.redirect("back");	
							}
						});
					}
				})
			}
		}
	});
});

//delete precriptions
router.delete("/user-view/health-record/my-prescription/delete-prec/:customer/:prescription",middleware.isLoggedIn,function(req, res){
    Prescription.findByIdAndRemove(req.params.prescription, function(err, pres){
        if(err){
            console.log(err);
            req.redirect("back");
        } else {
            Customer.findByIdAndUpdate(req.params.customer, {
              $pull: {
                prescriptions: pres.id
              }
            }, function(err) {
              if(err){ 
                console.log(err)
              } else {
                req.flash('error', 'Record deleted!');
                res.redirect("back");
              }
            });
        }
    });
});

//uploading image records
router.post("/user-view/health-record/my-record/add-record/:id",middleware.isLoggedIn,function(req,res){
	upload(req, res, (err) =>{
		if(err){
			res.redirect("back");
		} else{
			if(req.file == undefined){
				res.redirect("back");
			} else {
				Customer.findById(req.params.id, function(err, customer_add){
					if(err){
						console.log(err);
						req.flash('error', 'Something went worng!');
						res.redirect("back");
					} else {
						var recImage= "/uploads/"+req.file.filename;	
						var newrecord = new Record({
						recordDate: moment.tz('Asia/Calcutta').format("YYYY-MM-DDTHH:MM:ss"),
						recordId: randomize('0', 5),
						patientName: req.body.patientName,
						phoneNumber: req.body.phoneNumber,
						relation: req.body.relation,
						image: recImage
						});
						Record.create(newrecord, function(err, rec){
							if(err){
								console.log(err);
								req.flash('error', 'Something went worng!');
								res.redirect("back");
							}else{
								customer_add.records.push(rec);
								customer_add.save();
								req.flash('success', 'Created successfully');
								res.redirect("back");	
							}
						});
					}
				})
			}
		}
	});
});

//delete records
router.delete("/user-view/health-record/my-record/delete-record/:customer/:record",middleware.isLoggedIn,function(req, res){
    Record.findByIdAndRemove(req.params.record, function(err, recordInfo){
        if(err){
            console.log(err);
            req.redirect("back");
        } else {
            Customer.findByIdAndUpdate(req.params.customer, {
              $pull: {
                records: recordInfo.id
              }
            }, function(err) {
              if(err){ 
                console.log(err)
              } else {
                req.flash('error', 'Record deleted!');
                res.redirect("back");
              }
            });
        }
    });
});

//invoices 
//invoice get page
router.get("/user-view/health-record/invoice/:id",middleware.isLoggedIn, function(req,res){
	var customer = req.params.id;
	Customer.findById(req.params.id).populate("invoices").exec(function(err, allinvoices){
		if(err){
			console.log(err);
		} else {
			res.render("user/invoice",{allinvoices:allinvoices, customer:customer});
		}
	});
});
//invoice post page
router.post("/user-view/health-record/invoice/add-invoice/:id",middleware.isLoggedIn,function(req,res){
	upload(req, res, (err) =>{
		if(err){
			res.redirect('back',{
				msg:err
			});
		} else{
			if(req.file == undefined){
				res.redirect('back',{
					msg:'Error: No File Selected!'
				});
			} else {
				Customer.findById(req.params.id, function(err, customer_add){
					if(err){
						console.log(err);
					} else {
						var image= "/uploads/"+req.file.filename;	
						var newpres = new Invoice({
						invoiceDate: moment.tz('Asia/Calcutta').format("YYYY-MM-DDTHH:MM:ss"),
						invoiceId: randomize('0', 5),
						patientName: req.body.patientName,
						relation: req.body.relation,
						image: image
						});
						Invoice.create(newpres, function(err, pres){
							if(err){
								console.log(err);
								req.flash('error', 'Something went worng!');
								res.redirect("back");
							}else{
								console.log(pres);
								customer_add.invoices.push(pres);
								customer_add.save();
								req.flash('success', 'Created successfully');
								res.redirect("back");	
							}
						});
					}
				})
			}
		}
	});
});

//delete invoices
router.delete("/user-view/health-record/invoice/delete-invoice/:customer/:prescription",middleware.isLoggedIn,function(req, res){
    Invoice.findByIdAndRemove(req.params.prescription, function(err, pres){
        if(err){
            console.log(err);
            req.redirect("back");
        } else {
            Customer.findByIdAndUpdate(req.params.customer, {
              $pull: {
                invoices: pres.id
              }
            }, function(err) {
              if(err){ 
                console.log(err)
              } else {
                req.flash('error', 'Invoice deleted!');
                res.redirect("back");
              }
            });
        }
    });
});

//my-members

router.get("/user-view/my-members/:id",middleware.isLoggedIn, middleware.isLoggedIn,function(req,res){
	var customer = req.params.id;
	Customer.findById(req.params.id).populate("members").exec(function(err, allmember){
		if(err){
			console.log(err);
		} else {
			res.render("user/member",{allmember:allmember, customer:customer});
		}
	});
});
//member post page
router.post("/user-view/health-record/member/add-member/:id",middleware.isLoggedIn,function(req,res){
	upload(req, res, (err) =>{
		if(err){
			res.redirect('back',{
				msg:err
			});
		} else{
			if(req.file == undefined){
				res.redirect('back',{
					msg:'Error: No File Selected!'
				});
			} else {
				Customer.findById(req.params.id, function(err, customer_add){
					if(err){
						console.log(err);
					} else {
						var image= "/uploads/"+req.file.filename;	
						var newpres = new Member({
						created: moment.tz('Asia/Calcutta').format("YYYY-MM-DDTHH:MM:ss"),
						name: req.body.name,
						relation: req.body.relation,
						image: image
						});
						Member.create(newpres, function(err, pres){
							if(err){
								console.log(err);
								req.flash('error', 'Something went worng!');
								res.redirect("back");
							}else{
								customer_add.members.push(pres);
								customer_add.save();
								req.flash('success', 'Created successfully');
								res.redirect("back");	
							}
						});
					}
				})
			}
		}
	});
});

//delete members
router.delete("/user-view/health-record/member/delete-member/:customer/:prescription",middleware.isLoggedIn,function(req, res){
    Member.findByIdAndRemove(req.params.prescription, function(err, pres){
        if(err){
            console.log(err);
            req.redirect("back");
        } else {
            Customer.findByIdAndUpdate(req.params.customer, {
              $pull: {
                members: pres.id
              }
            }, function(err) {
              if(err){ 
                console.log(err)
              } else {
                req.flash('error', 'Member deleted!');
                res.redirect("back");
              }
            });
        }
    });
});
//coupon used
router.get("/user-view/coupon-codes/:id",middleware.isLoggedIn, function(req,res){
	Customer.findById(req.params.id, function(err, foundCustomer){
		if(err){
			console.log(err);
		} else {
			res.render("user/coupon-code", {foundCustomer:foundCustomer});
		}
	})
});

//order-history
router.get("/user-view/order-history/:id",middleware.isLoggedIn, function(req,res){
	Customer.findById(req.params.id, function(err, foundCustomer){
		if(err){
			console.log(err);
		} else {
			Order.find({"contactNumber": foundCustomer.phone}, function(err, allorders){
				if(err){
					console.log(err);
				} else {
					var created = 0;
					var all = 0;
					var cart = 0;
					var prescription = 0;
					allorders.forEach(function(data){
						all = all + 1; 
						if(data.orderType == "created"){
							created = created + 1;
						} else if(data.orderType == "cart"){
							cart = cart + 1;
						} else if(data.orderType == "prescription"){
							prescription = prescription + 1;
						}
					});
					res.render("user/order_view",{foundCustomer:foundCustomer, allorders:allorders, all:all, created:created, cart:cart, prescription:prescription})
				}
			})
		}
	});
});

//view orders
router.get("/user-view/order-history/view-order/:id",middleware.isLoggedIn, function(req,res){
	Order.findById(req.params.id, function(err, order_view){
		if(err){
			console.log(err);
		} else {
			res.render("user/order_view1",{orders:order_view})
		}
	})
});

//view perticulars
router.get("/user-view/order-history/view-order/view-perticulars/:id",middleware.isLoggedIn, function(req,res){
	Order.findById(req.params.id, function(err, order_view){
		if(err){
			console.log(err);
		} else {
			res.render("user/order_view3",{order_view:order_view})
		}
	})
});


module.exports = router;