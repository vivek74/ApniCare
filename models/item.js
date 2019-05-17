var mongoose = require("mongoose");

var itemSchema = mongoose.Schema({
		created:{type: Date},
		itemId: String, //10digit auto generated number
	    itemImage: {type: String, default: "/images/default-med.jpg"},
	    itemName: String,
	    //drug/salt
	    quantity: 
	     [
	      {
	        unitQty: Number,
	        packagingUnit1: String,//mandatory, drop down
	    	packagingUnit2: String,//mandatory, drop down
	    	mrp:Number,//mandatory,
	    	discount: Number,
	      }
	    ],
	    manufacturerName: String,
	    detailedInfo: String //optional
		},
	{
		usePushEach: true
});

module.exports = mongoose.model("Item", itemSchema);