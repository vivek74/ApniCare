var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Address = require("../models/address");
var Customer = require("../models/customer");
var Medicine = require("../models/medicine");
var Drug = require("../models/drugs");
var Coupon = require("../models/couponCode");
var Item = require("../models/item");
const nodemailer = require('nodemailer');
var request = require('request');
var randomize = require('randomatic');
var moment = require('moment-timezone');
var middleware = require("../middleware");
var multer = require('multer');
let Order = require("../models/order");
var upload = multer({
    dest: 'uploads/'
})


router.get("/place_orders",middleware.isLoggedIn, (req, res) => {
    res.render("order/order_book");
});

router.get("/all_orders",middleware.isLoggedIn, (req, res) => {
    res.render("order/order_view");
});

router.get("/get_allOrders",middleware.isLoggedIn, (req, res) => {
    Order.find({}).then(data => {
        res.contentType('json');
        res.send({
            order: data
        });
    })
});

router.post("/update_wallet",middleware.isLoggedIn, (req, res) => {
    Customer.findOne({
        'phone': req.body.phone
    }).then(data => {
        Customer.update({
            "phone": req.body.phone
        }, {
            "$set": {
                "walletAccount": parseFloat(data.walletAccount) + parseFloat(req.body.amt)
            }
        }, {
            "upsert": true
        }, (err, order) => {
            res.contentType('json');
            res.send({
                data: "updated"
            });
        })
    })
});

router.post("/check_phone",middleware.isLoggedIn, (req, res) => {
    Customer.findOne({
        'phone': req.body.phone
    }).populate("addresses").then(data => {
        res.contentType('json');
        res.send({
            user: data
        });

    })
});

router.post("/check_medicine",middleware.isLoggedIn, (req, res) => {
    Medicine.find({
        'medicineName': {
            '$regex': '.*' + req.body.medicine + '.*',
            '$options': 'i'
        }
    }).then(data => {
        res.contentType('json');
        res.send({
            medicine: data
        });

    })
});

router.post("/get_medicine",middleware.isLoggedIn, (req, res) => {
    Medicine.findOne({
        'medicineName': req.body.medicine
    }).then(data => {
        res.contentType('json');
        res.send({
            medicine: data
        });

    })
});

router.post("/get_coupon",middleware.isLoggedIn, (req, res) => {
    Coupon.findOne({
        'couponCodeName': req.body.coupon,
        'factor': 'GLOBAL',
        'status': true
    }).then(data => {
        if (data === null) {
            res.contentType('json');
            res.send({
                coupon: "NULL"
            });
        } else {
            res.contentType('json');
            res.send({
                coupon: data
            });
        }
    })
});

router.post("/check_coupon",middleware.isLoggedIn, (req, res) => {
    Customer.findOne({
        'phone': req.body.phone
    }).then(data => {
        res.contentType('json');
        res.send({
            user: data
        });
    })
});

router.post('/update_orderdata',middleware.isLoggedIn, (req, res) => {
    Order.findOne({
        '_id': req.body.id
    }).then(data => {
        Order.update({
            "_id": data._id
        }, {
            "$set": {
                "address": req.body.address
            }
        }, {
            "upsert": true
        }, (err, updatedData) => {
            if (err) {
                console.log(err);
            } else {
                res.contentType('json');
                res.send({
                    user: "SUCCESS"
                });
            }
        })
    })
});

router.post("/create_user",middleware.isLoggedIn, (req, res) => {

    var newcustomer = new Customer({
        joinedAt: moment.tz('Asia/Calcutta').format("YYYY-MM-DDTHH:MM:ss"),
        userId: "CUST" + randomize('0', 10),
        username: req.body.userName,
        phone: req.body.phone,
        alternateNumber: req.body.alternatenumber,
        userType: req.body.userType
    })

    Customer.create(newcustomer, function (err, customer) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.body);
            var addressLine1 = req.body.addressline1.toLowerCase();
            var addressLine2 = req.body.addressline2.toLowerCase();
            var landmark = req.body.landmark.toLowerCase();
            var city = req.body.city.toLowerCase();
            var state = req.body.state.toLowerCase(); //dropdown options
            var country = req.body.country.toLowerCase();

            var newData = {
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                landmark: landmark,
                city: city,
                state: state,
                country: country
            };

            Customer.findById(customer._id, function (err, found) {
                if (err) {
                    console.log(err);
                } else {
                    Address.create(newData, function (err, added) {
                        if (err) {
                            console.log(err)
                        } else {
                            found.addresses.push(added);
                            found.save();
                            res.contentType('json');
                            res.send({
                                user: "CREATED"
                            });
                        }
                    })
                }
            });
        }
    });

});

router.get('/view_profile/:id',middleware.isLoggedIn, (req, res) => {
    Order.findOne({
        '_id': req.params.id
    }).then(data => {
        res.render("order/order_userprofile", {
            profile: data
        })
    })
});

router.post('/change_orderStatus',middleware.isLoggedIn, (req, res) => {
    Order.findOne({
        '_id': req.body.id
    }).then(data => {
        Order.update({
            "_id": data._id
        }, {
            "$set": {
                "orderStatus": req.body.orderStatus
            }
        }, {
            "upsert": true
        }, (err, updatedData) => {
            if (err) {
                console.log(err);
            }
        })
    })
});

router.get('/get_particulars/:id',middleware.isLoggedIn, (req, res) => {
    Order.findOne({
        '_id': req.params.id
    }).then(data => {
        res.render('order/order_particulars', {
            order: data
        })
    })
});

router.get('/edit_orders/:id',middleware.isLoggedIn, (req, res) => {
    Order.findOne({
        '_id': req.params.id
    }).then(data => {
        res.render('order/edit_order', {
            order: data
        })
    })
});

router.post('/upload_prescriptions', upload.array('userfiles[]', 2), function (req, res, next) {
    Order.findOne({
        '_id': req.body.orderId
    }).then(data => {
        Order.update({
            "_id": data._id
        }, {
            "$set": {
                "prescriptionImage": req.files[0]['filename']
            }
        }, {
            "upsert": true
        }, (err, order) => {
            res.contentType('json');
            res.send({
                order: order
            });
        })
    })
});

router.post('/upload_orderdata',middleware.isLoggedIn, (req, res) => {
    let medicines = new Array();
    function addmedicine(type, Qty, price, name, discount,id, objlength) {
        medicines.push({
            medicinetype: type,
            Qty: Qty,
            Price: price,
            Discount: discount,
            Name: name,
            medicine_id: String(id)
        })

        if (medicines.length === objlength) {
            let promocodeOrWallet;

            if (req.body.promoCode !== "") {
                promocodeOrWallet = "promocode";

                Customer.findOne({
                    'phone': req.body.patientNumber
                }).then(data => {
                    data.couponsUsed.push(req.body.promoCode);
                    Customer.update({
                        "_id": data._id
                    }, {
                        "$set": {
                            "couponsUsed": data.couponsUsed
                        }
                    }, {
                        "upsert": true
                    }, (err, customer) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("working");
                        }
                    })
                })

            } else if (req.body.walletAmt !== "") {
                promocodeOrWallet = "wallet";

                Customer.findOne({
                    'phone': req.body.patientNumber
                }).then(data => {

                    data.walletAccount = parseFloat(data.walletAccount) - parseFloat(req.body.walletAmt);

                    Customer.update({
                        "_id": data._id
                    }, {
                        "$set": {
                            "walletAccount": data.walletAccount
                        }
                    }, {
                        "upsert": true
                    }, (err, customer) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("working");
                        }
                    })
                })
            } else {
                promocodeOrWallet = "";
            }

            Customer.findOne({
                'phone': req.body.patientNumber
            }).then(data => {

                data.walletAccount = parseFloat(data.walletAccount) + parseFloat(req.body.cashbackAmt);

                Customer.update({
                    "_id": data._id
                }, {
                    "$set": {
                        "walletAccount": data.walletAccount
                    }
                }, {
                    "upsert": true
                }, (err, customer) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("working");
                    }
                })
            })

            let orderObject = new Order({
                orderId: "axew" + randomize('0', 10),
                orderDate: moment.tz('Asia/Calcutta').format("YYYY-MM-DDTHH:MM:ss"),
                orderType: "created",
                userName: req.body.patientName,
                atulyaCardNumber: req.body.atulyaCard,
                contactNumber: req.body.patientNumber,
                address: req.body.address,
                userType: req.body.userType,
                medicines: medicines,
                wallet: req.body.walletAmt,
                alternateNumber: req.body.alternateNumber,
                promocodeOrWallet: promocodeOrWallet,
                prescriptionImage: "",
                promocode: req.body.promoCode,
                netTotal: req.body.totalAmt,
                cashbackAmt: req.body.cashbackAmt,
                discountedAmt: req.body.discountAmt

            });



            Order.create(orderObject, function (err, order) {
                if (err) {
                    console.log(err);
                } else {
                    res.contentType('json');
                    res.send({
                        order: order
                    });
                }
            });

        }

    }



    for (let i = 0; i < req.body.medicineName.length; i++) {

        let medicineid = "";

        Medicine.findOne({
            'medicineName': req.body.medicineName[i],
        }).then(data => {
            let id = data._id;
            addmedicine(req.body.medicineUnit[i], req.body.medicineQty[i], req.body.medicinePrice[i], req.body.medicineName[i], req.body.medicineDiscount[i],id, req.body.medicineName.length)
        })



    }

    for (let i = 0; i < req.body.medicineName.length; i++) {
        if (req.body.medicineUnit[i].includes('Bottle')) {
            Medicine.findOne({
                'medicineName': req.body.medicineName[i],
            }).then(data => {
                data.quantity.forEach((items, key) => {


                        if (items.packagingUnit2 === req.body.medicineUnit[i].match(/\d/g).join("")) {
                            data.quantity[key].unitQty = parseFloat(items.unitQty) - parseFloat(req.body.medicineQty[i]);
                            console.log(data);
                            Medicine.findByIdAndUpdate(data._id, {
                                $set: data
                            }, function (err, updated) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(updated);
                                }
                            });
                        }
                })

                
            })
        
} else if (req.body.medicineUnit[i] === "Tablets") {
    Medicine.findOne({
        'medicineName': req.body.medicineName[i],
    }).then(data => {
        Medicine.update({
            "_id": data._id,
        }, {
            "$set": {
                "totalTablet": parseFloat(data.totalTablet) - parseFloat(req.body.medicineQty[i])
            }
        }, {
            "upsert": true
        })
    })
} else {
    Medicine.findOne({
        'medicineName': req.body.medicineName[i],
    }).then(data => {
        Medicine.update({
            "_id": data._id,
        }, {
            "$set": {
                "unitQty": parseFloat(data.unitQty) - parseFloat(req.body.medicineQty[i])
            }
        }, {
            "upsert": true
        })
    })
}
}

});



module.exports = router;
