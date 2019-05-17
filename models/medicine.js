var mongoose = require("mongoose");

var medicineSchema = mongoose.Schema({
		created:{type: Date},
		medicineId: String, //10digit auto generated number
		MedicineImage1: {type: String, default: "/images/default-med.jpg"},
		MedicineImage2: {type: String, default: "/images/default-med.jpg"},
		MedicineImage3: {type: String, default: "/images/default-med.jpg"},
		MedicineImage4: {type: String, default: "/images/default-med.jpg"},
		medicineName: String,
		medDiscount: Number,
	    //drug/salt
	    drugs: 
	     [
	      {
	         salt: String,
	         strength: String
	      }
		],
		//drug/salt (items)
	    quantity: 
	     [
	      {
	        unitQty: Number,
	        packagingUnit1: String,//mandatory, drop down
	    	packagingUnit2: String,//mandatory, drop down
	    	mrp:Number,//mandatory,
			discount: Number,
			rate: Number,
	      }
	    ],
	    strength: String,//mandatory
	    manufacturerName: String,
	    unitQty: Number,
	    packagingUnit1: String,//mandatory, drop down
	    packagingUnit2: String,//mandatory, drop down
	    totalTablet: Number,
	    mainlyPrescribedFor: String,//optional
	    mrp:Number,//mandatory,
	    rate:Number,//auto calculated
	    prescriptionNeeded: {type: Boolean, default: true},//mandatory
	    decimalNeeded: {type:Boolean, default: false},//mandatory
		medType: {type:Boolean, default: false}, //mandatory, toggle
		isItem: {type:Boolean, default: false}, //item checking
	    detailedInfo: String, //optional
	    discount: Number,
	    category: String, //drop down, general store, cosmetics
	    //inventory status
		inventoryStatus: String, //dd Discountinued,Unavailable
		ItemType: String
		},
	{
		usePushEach: true
});

module.exports = mongoose.model("Medicine", medicineSchema);