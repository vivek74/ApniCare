var mongoose = require("mongoose");

var orderSchema = mongoose.Schema({
    orderId : String, //10digit auto generated
    orderDate: {type: Date},
    orderType: String, //dd, cart, prescription, created
    orderStatus: {type: String, default: "Processing"}, //dd, processing (default), (confirmed, in transit, out for delievery, delivered(once delivered), cancelled, returned)
    userName: String,
    atulyaCardNumber: String,
    contactNumber: String,
    address: String,
    userType: String,
    alternateNumber: String,
    //medicines
	medicines: 
	[{
        medicinetype: String,
        Qty: String,
        Price: String,
        Discount: String,
        Name: String,
	    medicine_id :{
	        type: mongoose.Schema.Types.ObjectId,
	        ref: "Medicine"
	    }
        
    }],
	quantity: Number,
	prescriptionImage: String,
	
	promocode: String,
    wallet: String,

	//use of promocode or wallet
	promocodeOrWallet: String,
    netTotal: String,
    cashbackAmt: String,
    discountedAmt: String

	// (If order type is prescription ,
	// and no medicine is entered by the user,
	//  only prescription, then the order will first
	//   be filled with the meds, and then be
	//   approved by the admin.)
	}

);

module.exports = mongoose.model("Order", orderSchema);