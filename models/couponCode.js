var mongoose = require("mongoose");

var couponSchema = mongoose.Schema({
	couponCodeId: String, //auto generated 10 digit id
    couponCodeName: {type: String, unique: true} , //mandatory
    status: {type: Boolean, default: false}, //mandatory
    type: String, //dd, cashBack, discount
    minValue: Number,
    valueAmount: Number,
    validForm: {type: String},
    validThrough: {type: String},
    factor: String, //discrete, global (min transactions & Max Transactions, mandatory, numeric )
    expired: {type: Boolean, default: false} 
});
module.exports = mongoose.model("Coupon", couponSchema);