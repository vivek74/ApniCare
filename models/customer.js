var mongoose = require("mongoose");
//var passportLocalMongoose = require("passport-local-mongoose");

var CustomerSchema = new mongoose.Schema({
    userId: {type: String, unique: true}, //cust123456
    username: {type: String, unique: true},
    phone: {type: String, unique: true},
    alternateNumber: {type: String},
    joinedAt: { type: Date },
    atulyaCard: String,
    name: String,
    email: String,
    gender: String,
    userType: {type: String, default: "HFC"}, //HFC,LFC,NFC
    requestedUserType: {type: String},

    //address
    addressLine1: String,
    addressLine2: String,
    landmark: String,
    city: String,
    state: String, //dropdown options
    country: String, //dropdown options
    
    //Identification (adhar) schema
    adharCard: String,
    adharCardPicFront: String,
    adharCardPicBack: String,

    //Identification (ration card) schema
    rationCard: String,
    rationCardPicFront: String,
    rationCardPicBack: String,

    //reset password schema
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    //all coupons used
    couponsUsed: 
    [
      {
        couponName: String
      }
    ],

    //wallet account schema
    walletAccount: {type: Number, default: 0},
    transactions: 
    [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Transaction"
      }
    ],

    //address details schema
    addresses: 
    [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Address"
      }
    ],

    //user state schema
    userState: {type: Boolean, default: true}, //pending aur not pending

    //health schema
    allergies: String,
    currentMedication: String,
    pastMedication: String,
    chronicDiseases: String,
    injuries: String,
    surgeries: String,

    //Lifestyle schema
    smokingHabit: String, 
    alcoholConsumption: String, 
    activitylevel: String, 
    foodPreference: String, 
    occupation: String,

    //prescription and relations array schema
    prescriptions: 
     [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Prescription"
      }
    ],

    //invoices schema
    invoices: 
     [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Invoice"
      }
    ],

    //my medicines
    mymedicines: 
     [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "myMedicine"
      }
    ],

    //members
    members: 
     [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Member"
      }
    ],

    //Records schema
    records: 
     [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Record"
      }
    ],

    //user type schema
    isAdmin: {type: Boolean, default: false},
    isSubAdmin: {type: Boolean, default: false},
    isCustomer: {type: Boolean, default: false},
    isRead: {type: Boolean, default: true},
    isWrite: {type: Boolean, default: false},
    isSuspended: {type: Boolean, default: false},
 },

  {
    usePushEach: true
});

//UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Customer", CustomerSchema);
