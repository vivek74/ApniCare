var mongoose = require("mongoose");

var drugSchema = mongoose.Schema({
	drugId: String,
    name: String,//mandatory
    usedFor: String,
    working: String,
    medicineAvailable: 
	[
	    {
	        company: String,
	        medicine: String,
	    }
	],
	faq:
	[
		{
			question:String,
			answer:String,
		}
	]
});

module.exports = mongoose.model("Drug", drugSchema);